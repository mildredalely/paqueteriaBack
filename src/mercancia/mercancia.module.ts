import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercanciaService } from './mercancia.service';
import { MercanciaController } from './mercancia.controller';
import { Mercancia } from './entities/mercancia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mercancia])],
  controllers: [MercanciaController],
  providers: [MercanciaService],
})
export class MercanciaModule {}
