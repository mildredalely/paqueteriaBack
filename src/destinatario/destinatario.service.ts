import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destinatario } from './entities/destinatario.entity';
import { CreateDestinatarioDto } from './dto/create-destinatario.dto';
import { UpdateDestinatarioDto } from './dto/update-destinatario.dto';

@Injectable()
export class DestinatarioService {
  constructor(
    @InjectRepository(Destinatario)
    private destinatarioRepository: Repository<Destinatario>,
  ) {}

  async create(data: CreateDestinatarioDto): Promise<Destinatario> {
    const nuevo = this.destinatarioRepository.create(data);
    return await this.destinatarioRepository.save(nuevo);
  }

  findAll(): Promise<Destinatario[]> {
    return this.destinatarioRepository.find();
  }

  async findOne(id: number): Promise<Destinatario> {
    const destinatario = await this.destinatarioRepository.findOneBy({
      id_destinatario: id,
    });

    if (!destinatario) {
      throw new NotFoundException(`Destinatario con ID ${id} no encontrado`);
    }

    return destinatario;
  }

  async update(id: number, data: UpdateDestinatarioDto): Promise<Destinatario> {
    await this.destinatarioRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.destinatarioRepository.delete(id);
  }
}
