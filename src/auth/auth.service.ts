import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  // CREATE USER (register)
  async register(username: string, password: string) {
    const exists = await this.userRepo.findOne({ where: { username } });
    if (exists) throw new Error('Usuario ya existe');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ username, passwordHash });

    return await this.userRepo.save(user);
  }

  // LOGIN
  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Contraseña incorrecta');

    return { message: 'Login correcto', username: user.username };
  }

  // GET ONE USER
  async getById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  // GET ALL USERS
  async getAll() {
    return this.userRepo.find();
  }

  // UPDATE USER
  async update(id: number, dto: any) {
    const user = await this.getById(id); 

    if (dto.password) {
      dto.passwordHash = await bcrypt.hash(dto.password, 10);
      delete dto.password;
    }

    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  // DELETE USER
  async remove(id: number) {
    const user = await this.getById(id);
    return this.userRepo.remove(user);
  }
}
