import {
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { TipoProducto } from '../entities/tarifa.entity';

export class CreateTarifaDto {
  @IsString()
  ubicacion_destino: string;

  @IsEnum(TipoProducto)
  tipo_producto: TipoProducto;

  @IsNumber()
  precio_libra: number;

  @IsNumber()
  precio_extra_documentos: number;

  @IsBoolean()
  mayoreo_aplica: boolean;

  @IsOptional()
  @IsNumber()
  umbral_mayoreo?: number;

  @IsOptional()
  @IsNumber()
  precio_mayoreo?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
