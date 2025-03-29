// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../Auth/auth.service';
import { user } from 'src/interfaces/userInterface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await this.authService.hashPassword(password);
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async authenticateUser(email: string, password: string): Promise<boolean> {
    const user: user | null = await this.findByEmail(email);

    if (!user) {
      return false;
    } else {
      return await this.authService.comparePassword(password, user.password);
    }
  }
}
