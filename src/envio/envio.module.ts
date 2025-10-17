import { Module } from '@nestjs/common';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { Remitente } from 'src/remitente/entities/remitente.entity';
import { Envio } from './entities/envio.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Envio, Remitente])],
  controllers: [EnvioController],
  providers: [EnvioService],
})
export class EnvioModule {}
