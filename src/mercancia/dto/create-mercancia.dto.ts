import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoProducto } from '../entities/mercancia.entity';

export class CreateMercanciaDto {
  @IsString()
  descripcion: string;

  @IsEnum(TipoProducto)
  tipo_producto: TipoProducto;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  peso_libras: number;

  @IsNumber()
  valor_declarado: number;

  @IsNumber()
  precio_unitario: number;

  @IsNumber()
  @IsOptional()
  subtotal?: number;

  //@IsOptional()
  //d_tarifa?: number;
}
