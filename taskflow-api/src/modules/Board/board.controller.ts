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
  Param,
  Put,
  NotAcceptableException,
  Delete,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Response, Request } from 'express';
import { ResponseUtil } from 'src/utils/response';
import { AuthService } from '../Auth/auth.service';
import { board } from 'src/interfaces/boardInterface';
import { AuthGuard } from 'src/middleware/auth.guard';

// BOARDS ROUTE
@Controller('boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private authService: AuthService,
  ) {}

  @Post()
  async newBoard(
    @Body() body: board,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    // Criando o Board no Banco
    try {
      // Pegando o Usuário que está criando o Board
      const token = this.authService.verifyToken(req.cookies.jwt);
      const { title, description } = body;
      const board = { title: title, description: description, owner: token };

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
        'Internal Server Error',
      );
    }
  }

  @Get()
  async getBoards(@Res() res: Response, @Req() req: Request): Promise<object> {
    try {
      // Pegando o Usuário que está requisitando os Boards
      const token = this.authService.verifyToken(req.cookies.jwt);
      const boards = await this.boardService.getBoards(token.id);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.CREATED,
        'Data Retrieved Successfully!',
        boards,
      );
    } catch (error) {
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Put(':id')
  async updateBoard(
    @Param('id') id: number,
    @Body() body: board,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      // Pegando o Usuário que está editando o Board
      const token = this.authService.verifyToken(req.cookies.jwt);
      const { title, description } = body;

      // Caso algum dos campos venha vazio
      if (!title || !description) throw new NotAcceptableException();

      // Edita as informações do Board
      const editedBoard = await this.boardService.editBoard(
        id,
        title,
        description,
      );

      return ResponseUtil.sendResponse(
        res,
        HttpStatus.OK,
        'Board Edited Successfully!',
        editedBoard,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        return ResponseUtil.sendResponse(
          res,
          error.getStatus(),
          error.message || 'An error occurred',
        );
      }
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }

  @Delete(':id')
  async deleteBoard(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      // Pegando o Usuário que está editando o Board
      const token = this.authService.verifyToken(req.cookies.jwt);
      await this.boardService.deleteBoard(id);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.NO_CONTENT,
        'Board Deleted Successfully!',
      );
    } catch (error) {
      if (error instanceof HttpException) {
        return ResponseUtil.sendResponse(
          res,
          error.getStatus(),
          error.message || 'An error occurred',
        );
      }
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
