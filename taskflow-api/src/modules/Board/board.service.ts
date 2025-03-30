// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../Auth/auth.service';
import { Board } from 'src/database/entities/board.entity';
import { board } from 'src/interfaces/boardInterface';
import { user } from 'src/interfaces/userInterface';

export interface validationResponse {
  state: boolean;
  reason: string;
}

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    private authService: AuthService,
  ) {}

  async createBoard(board: board): Promise<Board> {
    const newBoard = this.boardRepository.create(board);
    return await this.boardRepository.save(newBoard);
  }

  async getBoards(ownerID: string): Promise<Board[]> {
    return this.boardRepository.find({
      where: { owner: { id: ownerID } },
      relations: ['members', 'lists'],
    });
  }

  async editBoard(id: number,title:string,description:string): Promise<Board | null> {
    const property = await this.boardRepository.findOne({
      where: { id },
    });

    // Caso não exista o Board com esse ID
    if(!property) throw new NotFoundException

    return this.boardRepository.save({
      ...property,
      ...{title,description},
    });
  }
}
