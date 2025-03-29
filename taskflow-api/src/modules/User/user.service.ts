// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { user } from 'src/interfaces/userInterface';
import { Repository } from 'typeorm';
import { AuthService } from '../Auth/auth.service';
import { z } from 'zod';

export interface validationResponse {
  state: boolean;
  reason: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async createUser(user: user): Promise<User> {
    const hashedPassword = await this.authService.hashPassword(user.password);
    const newUser = this.userRepository.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async authenticateUser(user: user): Promise<user | null> {
    const queryUser: user | null = await this.findByEmail(user.email);

    if (!queryUser) {
      return null;
    } else {
      const authentication = await this.authService.comparePassword(
        user.password,
        queryUser.password,
      );
      return authentication ? queryUser : null
    }
  }

  async validateRegister(user: user): Promise<validationResponse> {
    // Verificando se o email já está sendo utilizado
    if (await this.findByEmail(user.email)) return { state: false, reason: 'Email já está sendo utilizado' }

    // Usando Zod pra verificar se todos os campos estão de acordo com as validações
    const userSchema = z.object({
      name: z
        .string()
        .min(3, { message: 'Nome tem que ter ao menos 3 caracteres' }),
      email: z.string().email({ message: 'Email inválido' }),
      password: z
        .string()
        .min(6, { message: 'Senha tem que ter ao menos 6 caracteres' }),
    });

    try {
      userSchema.parse(user); // Valida o usuário
      return { state: true, reason: 'Usuário Válido' };
    } catch (e) {
      // Retornando o primeiro campo que não é válido
      return { state: false, reason: e.errors[0].message };
    }
  }
}
