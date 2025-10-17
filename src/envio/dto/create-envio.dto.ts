import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
//import { CreateMercanciaDto } from 'src/mercancia/dto/create-mercancia.dto';

export class CreateEnvioDto {
  @IsEnum(['MX', 'US'])
  origen: 'MX' | 'US';

  @IsEnum(['MX', 'US'])
  destino: 'MX' | 'US';

  @IsEnum(['MX', 'US'])
  tipo_cobro: 'MX' | 'US';

  @IsNumber()
  precio_total: number;

  @IsString()
  estado_envio: string;

  @IsBoolean()
  @IsOptional()
  firma_remitente?: boolean;

  @IsNumber()
  id_remitente: number;

  @IsNumber()
  id_destinatario: number;

  /* @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMercanciaDto)
  mercancias: CreateMercanciaDto[];*/
}
