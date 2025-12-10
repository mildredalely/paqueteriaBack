import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class CreateDestinatarioDto {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @Length(1, 100)
  apellido: string;

  @IsEmail()
  @Length(1, 100)
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  @Length(0, 15)
  telefono?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  direccion?: string;
}
