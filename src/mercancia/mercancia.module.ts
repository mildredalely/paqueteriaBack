import { Module } from '@nestjs/common';
import { MercanciaService } from './mercancia.service';
import { MercanciaController } from './mercancia.controller';

@Module({
  controllers: [MercanciaController],
  providers: [MercanciaService],
})
export class MercanciaModule {}
