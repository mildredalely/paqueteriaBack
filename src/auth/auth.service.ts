import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface User {
  id: number;
  username: string;
  passwordHash: string;
}


const users: User[] = [];

@Injectable()
export class AuthService {
  async register(username: string, password: string) {
    const exists = users.find(u => u.username === username);
    if (exists) throw new Error('Usuario ya existe');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), username, passwordHash };
    users.push(user);
    return { message: 'Usuario creado', username };
  }

  async login(username: string, password: string) {
    const user = users.find(u => u.username === username);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Contraseña incorrecta');

    return { message: 'Login correcto', username: user.username };
  }

  // obtener todos los usuarios (solo debug)
  getAll() {
    return users.map(u => ({ id: u.id, username: u.username }));
  }
}
