import {
  Body,
  Controller,
  Get,
  HttpStatus,
  HttpException,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService, validationResponse } from './board.service';
import { Response, Request } from 'express';
import { ResponseUtil } from 'src/utils/response';
import { AuthService } from '../Auth/auth.service';
import { user } from 'src/interfaces/userInterface';
import { board } from 'src/interfaces/boardInterface';
import { AuthGuard } from 'src/middleware/auth.guard';

// POST /boards → Criar board
// GET /boards → Listar boards do usuário
// PUT /boards/:id → Editar board
// DELETE /boards/:id

// BOARDS ROUTE
@Controller('boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private authService: AuthService,
  ) {}

  @Post()
  async newBoard(@Body() body: board, @Res() res: Response,@Req() req: Request): Promise<object> {
    // Criando o Board no Banco
    try {
      // Verificando o Token pra pegar o Usuário que está criando o Board
      const token = this.authService.verifyToken(req.cookies.jwt)
      const {title,description} = body
      const board = {title:title,description:description,owner:token}

      await this.boardService.createBoard(board);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.CREATED,
        'Board Created Successfully!',
      );
    } catch (error) {
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
      );
    }
  }


}
