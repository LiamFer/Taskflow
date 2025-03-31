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
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ResponseUtil } from 'src/utils/response';
import { AuthService } from '../Auth/auth.service';
import { AuthGuard } from 'src/middleware/auth.guard';
import { ListService } from './list.service';
import { list } from 'src/interfaces/listInterface';
import { Board } from 'src/database/entities/board.entity';

// BOARDS ROUTE
@Controller('lists')
@UseGuards(AuthGuard)
export class ListController {
  constructor(
    private readonly listService: ListService,
    private authService: AuthService,
  ) {}

  @Post('/boards/:boardId')
  async newList(
    @Param('boardId') boardId: number,
    @Body() body: list,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    // Criando a lista dentro do Board
    try {
      const list: list = { title: body.title, board: { id: boardId } as Board };
      await this.listService.createList(list);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.CREATED,
        'List Created Successfully!',
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

  @Get('/boards/:boardId')
  async getLists(@Param('boardId') boardId: number,@Res() res: Response, @Req() req: Request): Promise<object> {
    try {
      const lists = await this.listService.getLists(boardId);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.OK,
        'Data Retrieved Successfully!',
        lists,
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
  async updateList(
    @Param('id') id: number,
    @Body() body: list,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      // Pegando o Usuário que está editando o Board
      const title = body.title;
      // Caso algum dos campos venha vazio
      if (!title || !id) throw new NotAcceptableException();

      // Edita as informações do Board
      const editedList = await this.listService.editList(
        id,
        title
      );

      return ResponseUtil.sendResponse(
        res,
        HttpStatus.OK,
        'List Edited Successfully!',
        editedList,
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
  async deleteList(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      await this.listService.deleteList(id);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.NO_CONTENT,
        'List Deleted Successfully!',
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
