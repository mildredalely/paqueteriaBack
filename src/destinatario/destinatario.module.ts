import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinatarioService } from './destinatario.service';
import { DestinatarioController } from './destinatario.controller';
import { Destinatario } from './entities/destinatario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destinatario])],
  controllers: [DestinatarioController],
  providers: [DestinatarioService],
})
export class DestinatarioModule {}
