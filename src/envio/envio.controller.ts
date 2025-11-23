import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnvioService } from './envio.service';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { UpdateEstadoEnvioDto } from './estado-envio/update-estado-envio.dto';

@Controller('envios')
export class EnvioController {
  constructor(private readonly envioService: EnvioService) {}

  @Post()
  create(@Body() createEnvioDto: CreateEnvioDto) {
    return this.envioService.create(createEnvioDto);
  }

  @Get()
  findAll() {
    return this.envioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.envioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnvioDto: UpdateEnvioDto) {
    return this.envioService.update(+id, updateEnvioDto);
  }
  @Patch(':id/estado')
  actualizarEstado(@Param('id') id: string, @Body() dto: UpdateEstadoEnvioDto) {
    return this.envioService.actualizarEstado(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.envioService.remove(+id);
  }
}
