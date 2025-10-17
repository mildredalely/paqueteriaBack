import { Injectable } from '@nestjs/common';
import { CreateMercanciaDto } from './dto/create-mercancia.dto';
import { UpdateMercanciaDto } from './dto/update-mercancia.dto';

@Injectable()
export class MercanciaService {
  create(createMercanciaDto: CreateMercanciaDto) {
    return 'This action adds a new mercancia';
  }

  findAll() {
    return `This action returns all mercancia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mercancia`;
  }

  update(id: number, updateMercanciaDto: UpdateMercanciaDto) {
    return `This action updates a #${id} mercancia`;
  }

  remove(id: number) {
    return `This action removes a #${id} mercancia`;
  }
}
