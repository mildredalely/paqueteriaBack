import { Module } from '@nestjs/common';
import { RemitenteService } from './remitente.service';
import { RemitenteController } from './remitente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remitente } from './entities/remitente.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Remitente])],
  controllers: [RemitenteController],
  providers: [RemitenteService],
})
export class RemitenteModule {}
