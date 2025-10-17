import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MercanciaService } from './mercancia.service';
import { CreateMercanciaDto } from './dto/create-mercancia.dto';
import { UpdateMercanciaDto } from './dto/update-mercancia.dto';

@Controller('mercancia')
export class MercanciaController {
  constructor(private readonly mercanciaService: MercanciaService) {}

  @Post()
  create(@Body() createMercanciaDto: CreateMercanciaDto) {
    return this.mercanciaService.create(createMercanciaDto);
  }

  @Get()
  findAll() {
    return this.mercanciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mercanciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMercanciaDto: UpdateMercanciaDto) {
    return this.mercanciaService.update(+id, updateMercanciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mercanciaService.remove(+id);
  }
}
