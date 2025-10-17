import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RemitenteService } from './remitente.service';
import { Remitente } from './entities/remitente.entity';

@Controller('remitentes')
export class RemitenteController {
  constructor(private readonly remitenteService: RemitenteService) {}

  @Post()
  create(@Body() remitente: Remitente) {
    return this.remitenteService.create(remitente);
  }

  @Get()
  findAll() {
    return this.remitenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.remitenteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() remitente: Partial<Remitente>) {
    return this.remitenteService.update(id, remitente);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.remitenteService.remove(id);
  }
}
