import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarifa } from './entities/tarifa.entity';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';

@Injectable()
export class TarifaService {
  constructor(
    @InjectRepository(Tarifa)
    private readonly tarifaRepository: Repository<Tarifa>,
  ) {}

  async create(createTarifaDto: CreateTarifaDto): Promise<Tarifa> {
    const tarifa = this.tarifaRepository.create(createTarifaDto);
    return this.tarifaRepository.save(tarifa);
  }

  async findAll(): Promise<Tarifa[]> {
    return this.tarifaRepository.find();
  }

  async findOne(id: number): Promise<Tarifa> {
    const tarifa = await this.tarifaRepository.findOne({
      where: { id_tarifa: id },
    });
    if (!tarifa)
      throw new NotFoundException(`Tarifa con ID ${id} no encontrada`);
    return tarifa;
  }

  async update(id: number, updateTarifaDto: UpdateTarifaDto): Promise<Tarifa> {
    const tarifa = await this.findOne(id);
    Object.assign(tarifa, updateTarifaDto);
    return this.tarifaRepository.save(tarifa);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tarifaRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Tarifa con ID ${id} no encontrada`);
  }
}
