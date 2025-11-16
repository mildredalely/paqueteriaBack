import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mercancia } from './entities/mercancia.entity';
import { CreateMercanciaDto } from './dto/create-mercancia.dto';
import { UpdateMercanciaDto } from './dto/update-mercancia.dto';

@Injectable()
export class MercanciaService {
  constructor(
    @InjectRepository(Mercancia)
    private readonly mercanciaRepository: Repository<Mercancia>,
  ) {}

  async create(data: CreateMercanciaDto): Promise<Mercancia> {
    const mercancia = this.mercanciaRepository.create(data);
    return this.mercanciaRepository.save(mercancia);
  }

  findAll(): Promise<Mercancia[]> {
    return this.mercanciaRepository.find();
  }

  async findOne(id: number): Promise<Mercancia> {
    const mercancia = await this.mercanciaRepository.findOne({
      where: { id_mercancia: id },
    });

    if (!mercancia) {
      throw new NotFoundException(`Mercancia con ID ${id} no encontrada`);
    }

    return mercancia;
  }

  async update(id: number, data: UpdateMercanciaDto): Promise<Mercancia> {
    await this.mercanciaRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.mercanciaRepository.delete(id);
  }
}
