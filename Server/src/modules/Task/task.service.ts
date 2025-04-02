// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AuthService } from '../Auth/auth.service';
import { List } from 'src/database/entities/list.entity';
import { Task } from 'src/database/entities/task.entity';
import { task } from 'src/interfaces/taskInterface';

export interface validationResponse {
  state: boolean;
  reason: string;
}

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private authService: AuthService,
  ) {}

  async createTask(task: task): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return await this.taskRepository.save(newTask);
  }

  async getTasks(listID: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { list: { id: listID } },
    });
  }

  async editTask(
    id: number,
    title: string,
    description: string,
    completed: boolean,
  ): Promise<Task | null> {
    const property = await this.taskRepository.findOne({
      where: { id },
    });

    // Caso não exista uma Task com esse ID
    if (!property) throw new NotFoundException();

    return this.taskRepository.save({
      ...property,
      ...{ title, description, completed },
    });
  }

  async changeTaskList(id: number, list: Partial<List>): Promise<Task | null> {
    const property = await this.taskRepository.findOne({
      where: { id },
    });

    // Caso não exista uma Task com esse ID
    if (!property) throw new NotFoundException();

    return this.taskRepository.save({
      ...property,
      ...{ list },
    });
  }

  async deleteTask(id: number): Promise<DeleteResult> {
    const result = await this.taskRepository.delete({ id });
    if (!result.affected) throw new NotFoundException();
    return result;
  }
}
