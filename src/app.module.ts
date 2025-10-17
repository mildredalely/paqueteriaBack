import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemitenteModule } from './remitente/remitente.module';
import { EnvioModule } from './envio/envio.module';
import { MercanciaModule } from './mercancia/mercancia.module';
import { DestinatarioModule } from './destinatario/destinatario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'envios_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RemitenteModule,
    EnvioModule,
    MercanciaModule,
    DestinatarioModule,
  ],
})
export class AppModule {}
