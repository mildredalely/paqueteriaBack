import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register(username: string, password: string) {
    const exists = await this.userRepo.findOne({ where: { username } });
    if (exists) throw new Error('Usuario ya existe');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ username, passwordHash });

    await this.userRepo.save(user);

    return { message: 'Usuario creado', username };
  }

  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Contraseña incorrecta');

    return { message: 'Login correcto', username: user.username };
  }

  // 👉 FALTA ESTE MÉTODO PARA QUE NO TE MARQUE ERROR
  async getAll() {
    return this.userRepo.find();
  }
}
