// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AuthService } from '../Auth/auth.service';
import { List } from 'src/database/entities/list.entity';
import { list } from 'src/interfaces/listInterface';

export interface validationResponse {
  state: boolean;
  reason: string;
}

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    private authService: AuthService,
  ) {}

  async createList(list: list): Promise<List> {
    const newList = this.listRepository.create(list);
    return await this.listRepository.save(newList);
  }

  async getLists(boardID: number): Promise<List[]> {
    return await this.listRepository.find({
      where: { board: { id: boardID } }
    });
  }

  async editList(id: number, title: string): Promise<List | null> {
    const property = await this.listRepository.findOne({
      where: { id },
    });

    // Caso não exista uma Lista com esse ID
    if (!property) throw new NotFoundException();

    return this.listRepository.save({
      ...property,
      ...{ title },
    });
  }

  async deleteList(id: number): Promise<DeleteResult> {
    const result = await this.listRepository.delete({ id });
    if (!result.affected) throw new NotFoundException();
    return result;
  }
}
