import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RemitenteModule } from './remitente/remitente.module';
import { EnvioModule } from './envio/envio.module';
import { MercanciaModule } from './mercancia/mercancia.module';
import { DestinatarioModule } from './destinatario/destinatario.module';
import { TarifaModule } from './tarifa/tarifa.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      logging: true,
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: process.env.NODE_ENV !== 'production',
      ssl:{
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
    }),

    RemitenteModule,
    EnvioModule,
    MercanciaModule,
    DestinatarioModule,
    TarifaModule,

    //  módulo nuevo
    AuthModule,
  ],
})
export class AppModule {}
