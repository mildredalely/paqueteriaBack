import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Envio } from './entities/envio.entity';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { UpdateEstadoEnvioDto } from './estado-envio/update-estado-envio.dto';
import { EstadoEnvio } from './estado-envio/estado-envio.enum';
import { Remitente } from 'src/remitente/entities/remitente.entity';
import { Destinatario } from 'src/destinatario/entities/destinatario.entity';
import { Mercancia } from 'src/mercancia/entities/mercancia.entity';

@Injectable()
export class EnvioService {
  constructor(
    @InjectRepository(Envio)
    private readonly envioRepository: Repository<Envio>,

    @InjectRepository(Remitente)
    private readonly remitenteRepository: Repository<Remitente>,

    @InjectRepository(Destinatario)
    private readonly destinatarioRepository: Repository<Destinatario>,

    @InjectRepository(Mercancia)
    private readonly mercanciaRepository: Repository<Mercancia>,
  ) {}

  // Crear un envío
  async create(createEnvioDto: CreateEnvioDto): Promise<Envio> {
    const remitente = await this.remitenteRepository.findOne({
      where: { id_remitente: createEnvioDto.id_remitente },
    });
    if (!remitente) throw new NotFoundException('Remitente no encontrado');

    const destinatario = await this.destinatarioRepository.findOne({
      where: { id_destinatario: createEnvioDto.id_destinatario },
    });
    if (!destinatario)
      throw new NotFoundException('Destinatario no encontrado');

    const envio = this.envioRepository.create({
      origen: createEnvioDto.origen,
      destino: createEnvioDto.destino,
      tipo_cobro: createEnvioDto.tipo_cobro,
      precio_total: createEnvioDto.precio_total,
      estado_envio: createEnvioDto.estado_envio ?? EstadoEnvio.RECIBIDO_NUEVO,
      firma_remitente: createEnvioDto.firma_remitente ?? false,
      remitente,
      destinatario,
    });

    if (createEnvioDto.mercancias && createEnvioDto.mercancias.length > 0) {
      envio.mercancias = createEnvioDto.mercancias.map((m) =>
        this.mercanciaRepository.create({
          ...m,
          subtotal: m.cantidad * m.precio_unitario,
        }),
      );
    }

    return this.envioRepository.save(envio);
  }

  // Listar todos los envíos
  async findAll(): Promise<Envio[]> {
    return this.envioRepository.find({
      relations: ['remitente', 'destinatario', 'mercancias'],
    });
  }

  // Obtener un envío por ID
  async findOne(id_envio: number): Promise<Envio> {
    const envio = await this.envioRepository.findOne({
      where: { id_envio },
      relations: ['remitente', 'destinatario', 'mercancias'],
    });
    if (!envio) throw new NotFoundException('Envío no encontrado');
    return envio;
  }

  // Actualizar un envío completo
  async update(
    id_envio: number,
    updateEnvioDto: UpdateEnvioDto,
  ): Promise<Envio> {
    const envio = await this.findOne(id_envio);
    Object.assign(envio, updateEnvioDto);
    return this.envioRepository.save(envio);
  }

  // Eliminar un envío
  async remove(id_envio: number): Promise<void> {
    const envio = await this.findOne(id_envio);
    await this.envioRepository.remove(envio);
  }

  // ✅ Actualizar solo el estado del envío con validación
  async actualizarEstado(
    id_envio: number,
    dto: UpdateEstadoEnvioDto,
  ): Promise<Envio> {
    const envio = await this.findOne(id_envio);

    const transicionesValidas: Record<EstadoEnvio, EstadoEnvio[]> = {
      [EstadoEnvio.RECIBIDO_NUEVO]: [EstadoEnvio.IMPRIMIR_PENDIENTE],
      [EstadoEnvio.IMPRIMIR_PENDIENTE]: [EstadoEnvio.MODIFICACION_ENVIADO],
      [EstadoEnvio.MODIFICACION_ENVIADO]: [EstadoEnvio.RECIBIDO_COMPLETADO],
      [EstadoEnvio.RECIBIDO_COMPLETADO]: [],
    };

    const estadoActual = envio.estado_envio as EstadoEnvio;
    const estadoNuevo = dto.estado_envio;

    if (!transicionesValidas[estadoActual]?.includes(estadoNuevo)) {
      throw new Error(
        `No se puede cambiar de "${estadoActual}" a "${estadoNuevo}"`,
      );
    }

    envio.estado_envio = estadoNuevo;
    return this.envioRepository.save(envio);
  }
}
