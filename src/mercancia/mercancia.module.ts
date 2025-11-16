import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mercancia } from './entities/mercancia.entity';
import { MercanciaService } from './mercancia.service';
import { MercanciaController } from './mercancia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mercancia])],
  controllers: [MercanciaController],
  providers: [MercanciaService],
  exports: [TypeOrmModule],
})
export class MercanciaModule {}
