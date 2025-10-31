import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString, MinLength } from 'class-validator';

class RegisterDto {
  @IsString() username: string;
  @MinLength(4) password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto.username, dto.password);
  }

  @Post('login')
  login(@Body() dto: RegisterDto) {
    return this.auth.login(dto.username, dto.password);
  }

  // solo para ver usuarios creados (debug local)
  @Get('users')
  getAll() {
    return this.auth.getAll();
  }
}
