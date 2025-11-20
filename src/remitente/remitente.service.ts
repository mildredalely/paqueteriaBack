import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Remitente } from './entities/remitente.entity';
import { CreateRemitenteDto } from './dto/create-remitente.dto';

@Injectable()
export class RemitenteService {
  constructor(
    @InjectRepository(Remitente)
    private remitenteRepository: Repository<Remitente>,
  ) {}

  async create(data: CreateRemitenteDto): Promise<Remitente> {
    const nuevoRemitente = this.remitenteRepository.create(data);
    return await this.remitenteRepository.save(nuevoRemitente);
  }

  findAll(): Promise<Remitente[]> {
    return this.remitenteRepository.find();
  }

  async findOne(id: number): Promise<Remitente> {
    const remitente = await this.remitenteRepository.findOneBy({
      id_remitente: id,
    });
    if (!remitente) {
      throw new NotFoundException(`Remitente con ID ${id} no encontrado`);
    }
    return remitente;
  }

  async update(id: number, data: Partial<Remitente>): Promise<Remitente> {
    await this.remitenteRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.remitenteRepository.delete(id);
  }
}
