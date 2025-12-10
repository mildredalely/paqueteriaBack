import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateRemitenteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsString()   
  telefono: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  direccion: string;
}
