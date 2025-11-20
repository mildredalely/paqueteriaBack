import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(4)
  password: string;
}

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto.username, dto.password);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.username, dto.password);
  }

  @Get('users')
  getAll() {
    return this.auth.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.auth.getById(Number(id));
  }
}
