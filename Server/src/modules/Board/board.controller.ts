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
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Response, Request } from 'express';
import { ResponseUtil } from 'src/utils/response';
import { AuthService } from '../Auth/auth.service';
import { board } from 'src/interfaces/boardInterface';
import { AuthGuard } from 'src/middleware/auth.guard';
import { user } from 'src/interfaces/userInterface';
import { UserService } from '../User/user.service';

// BOARDS ROUTE
@Controller('boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
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
      if (!title || !description) throw new BadRequestException();

      const board = { title: title, description: description, owner: token };

      // Desestruturando o objeto pra voltar só o que eu quero
      let { id } = await this.boardService.createBoard(board);

      return ResponseUtil.sendResponse(
        res,
        HttpStatus.CREATED,
        'Board Created Successfully!',
        { id, title, description },
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

  @Get()
  async getBoards(@Res() res: Response, @Req() req: Request): Promise<object> {
    try {
      // Pegando o Usuário que está requisitando os Boards
      const token = this.authService.verifyToken(req.cookies.jwt);
      const boards = await this.boardService.getBoards(token.id);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.OK,
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

  @Post(':boardId/invite')
  async inviteMember(
    @Param('boardId') boardId: number,
    @Body() body: user,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    // Criando o Board no Banco
    try {
      // Pegando o Usuário que será adicionado ao Board
      const { email } = body;
      if (!email) throw new BadRequestException();
      const user: user | null = await this.userService.findByEmail(email);
      if (!user) throw new NotFoundException();
      await this.boardService.inviteMember(boardId, user);

      return ResponseUtil.sendResponse(
        res,
        HttpStatus.CREATED,
        'Member added Successfully!',
        {name:user.name,email:user.email},
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

  @Delete(':boardId/members/:memberEmail')
  async removeMember(
    @Param('boardId') id: number,
    @Param('memberEmail') memberEmail: string,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      // Pegando o Usuário que está editando o Board
      if (!memberEmail || !id) throw new BadRequestException();
      const user: user | null = await this.userService.findByEmail(memberEmail);
      if (!user) throw new NotFoundException();
      await this.boardService.removeMember(id, user);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.NO_CONTENT,
        'Member Removed Successfully!',
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

  @Get(':boardId/members')
  async getMembers(
    @Param('boardId') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      const members = await this.boardService.getMembers(id);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.OK,
        'Data Retrieved Successfully!',
        members,
      );
    } catch (error) {
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }
  }
}
