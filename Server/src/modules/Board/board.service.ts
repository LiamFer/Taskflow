// src/user/user.service.ts
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AuthService } from '../Auth/auth.service';
import { Board } from 'src/database/entities/board.entity';
import { board } from 'src/interfaces/boardInterface';
import { user } from 'src/interfaces/userInterface';
import { User } from 'src/database/entities/user.entity';
import { error } from 'console';

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
      where: [{ owner: { id: ownerID } }, { members: { id: ownerID } }],
      relations: ['members'],
      select: {
        id: true,
        title: true,
        description: true,
        members: {
          name: false,
          email: false,
        },
      },
    });
  }

  async editBoard(
    id: number,
    title: string,
    description: string,
  ): Promise<Board | null> {
    const property = await this.boardRepository.findOne({
      where: { id },
    });

    // Caso não exista o Board com esse ID
    if (!property) throw new NotFoundException();

    return this.boardRepository.save({
      ...property,
      ...{ title, description },
    });
  }

  async deleteBoard(id: number): Promise<DeleteResult> {
    const result = await this.boardRepository.delete({ id });
    if (!result.affected) throw new NotFoundException();
    return result;
  }

  async inviteMember(id: number, user: user): Promise<Board | null> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['members', 'owner'],
    });

    // Caso não exista o Board com esse ID
    if (!board) throw new NotFoundException();

    // Verificando se o User não é o Dono do Board
    if (board.owner.id == user.id) throw new NotAcceptableException();

    // Verificando se o User já não é membro do Board
    board.members.forEach((member) => {
      if (member.id == user.id) throw new NotAcceptableException();
    });

    // Adicionando o User como Membro do Board
    board.members.push(user as User);

    return this.boardRepository.save({
      ...board,
    });
  }

  async removeMember(id: number, user: user): Promise<Board | null> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['members', 'owner'],
    });

    // Caso não exista o Board com esse ID
    if (!board) throw new NotFoundException();

    // Verificando se o User é membro do Board
    let memberIndex: number | null = null;
    board.members.forEach((member, index) => {
      if (member.id == user.id) {
        memberIndex = index;
      }
    });

    // Caso o Usuário nem seja membro desse board
    if (memberIndex == null) throw new NotFoundException();

    // Removendo o User como Membro do Board
    board.members.splice(memberIndex, 1);

    return this.boardRepository.save({
      ...board,
    });
  }

  async getMembers(id: number): Promise<Board[]> {
    return this.boardRepository
    .createQueryBuilder('board')
    .leftJoin('board.members', 'member')
    .where('board.id = :id', { id })
    .select(['member.name', 'member.email'])
    .getRawMany();
  }
}
