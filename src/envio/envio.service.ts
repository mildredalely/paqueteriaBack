import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Envio } from './entities/envio.entity';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { Remitente } from '../remitente/entities/remitente.entity';

@Injectable()
export class EnvioService {
  constructor(
    @InjectRepository(Envio)
    private envioRepository: Repository<Envio>,
    @InjectRepository(Remitente)
    private remitenteRepository: Repository<Remitente>,
  ) {}

  async create(createEnvioDto: CreateEnvioDto): Promise<Envio> {
    const remitente = await this.remitenteRepository.findOneBy({
      id_remitente: createEnvioDto.id_remitente,
    });

    if (!remitente) {
      throw new Error('Remitente no encontrado');
    }

    const envio = this.envioRepository.create({
      fecha_envio: createEnvioDto.fecha_envio,
      origen: createEnvioDto.origen,
      destino: createEnvioDto.destino,
      costo: createEnvioDto.costo,
      estado: createEnvioDto.estado ?? 'pendiente',
      remitente,
    });

    return this.envioRepository.save(envio);
  }

  findAll(): Promise<Envio[]> {
    return this.envioRepository.find({ relations: ['remitente'] });
  }

  findOne(id: number): Promise<Envio | null> {
    return this.envioRepository.findOne({
      where: { id_envio: id },
      relations: ['remitente'],
    });
  }

  async update(id: number, updateEnvioDto: UpdateEnvioDto): Promise<Envio> {
    const envio = await this.envioRepository.findOneBy({ id_envio: id });
    if (!envio) throw new Error('Envío no encontrado');

    Object.assign(envio, updateEnvioDto);
    return this.envioRepository.save(envio);
  }

  async remove(id: number): Promise<void> {
    await this.envioRepository.delete(id);
  }
}
