import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRemitenteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()   
  telefono: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  direccion: string;
}
