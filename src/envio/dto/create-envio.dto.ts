// src/envio/dto/create-envio.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateEnvioDto {
  @IsNotEmpty()
  @IsDateString()
  fecha_envio: string; // Fecha en formato ISO (YYYY-MM-DD o con hora)

  @IsNotEmpty()
  @IsString()
  destino: string; // Ejemplo: "Oaxaca", "Seaside", etc.

  @IsOptional()
  @IsString()
  estado_envio?: string; // Ejemplo: "Pendiente", "En tránsito", "Entregado"

  @IsNotEmpty()
  @IsNumber()
  costo_total: number;

  @IsNotEmpty()
  @IsNumber()
  id_remitente: number; // FK con Remitente

  @IsNotEmpty()
  @IsNumber()
  id_destinatario: number; // FK con Destinatario
}
