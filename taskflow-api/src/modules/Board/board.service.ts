// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../Auth/auth.service';
import { Board } from 'src/database/entities/board.entity';
import { board } from 'src/interfaces/boardInterface';

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


  
}
