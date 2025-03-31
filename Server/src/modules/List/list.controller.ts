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
}
