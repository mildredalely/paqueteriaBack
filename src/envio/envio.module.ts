import { Module } from '@nestjs/common';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { Remitente } from 'src/remitente/entities/remitente.entity';
import { Envio } from './entities/envio.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Destinatario } from 'src/destinatario/entities/destinatario.entity';
import { Mercancia } from 'src/mercancia/entities/mercancia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Envio, Remitente, Destinatario, Mercancia]),
  ],
  controllers: [EnvioController],
  providers: [EnvioService],
})
export class EnvioModule {}
