import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BoardService } from 'src/modules/Board/board.service';

@Injectable()
export class BoardPermissionGuard implements CanActivate {
  constructor(
    private readonly boardService: BoardService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
