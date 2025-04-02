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
  Patch,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ResponseUtil } from 'src/utils/response';
import { AuthGuard } from 'src/middleware/auth.guard';
import { TaskService } from './task.service';
import { task } from 'src/interfaces/taskInterface';

// TASKS ROUTE
@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) {}

  @Post('/lists/:listId')
  async newTask(
    @Param('listId') listId: number,
    @Body() body: task,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    // Criando a task dentro da List
    try {
      const { title, description } = body;
      if (!title) throw new NotAcceptableException();
      const task: task = { title, description, list: { id: listId } };
      const newTask = await this.taskService.createTask(task);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.CREATED,
        'Task Created Successfully!',
        newTask,
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

  @Get('/lists/:listId')
  async getTasks(
    @Param('listId') listId: number,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      const lists = await this.taskService.getTasks(listId);
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
  async updateTask(
    @Param('id') id: number,
    @Body() body: task,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      const { title, description, completed } = body;
      // Caso algum dos campos venha vazio/undefined
      if (!title || !description || completed == undefined || !id)
        throw new NotAcceptableException();

      // Edita as informações da Task menos a Lista que ela pertence
      const editedTask = await this.taskService.editTask(
        id,
        title,
        description,
        completed,
      );

      return ResponseUtil.sendResponse(
        res,
        HttpStatus.OK,
        'Task Edited Successfully!',
        editedTask,
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

  @Patch(':id/move')
  async changeTaskList(
    @Param('id') id: number,
    @Body() body: any,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      const { listId } = body;
      // Caso algum dos campos venha vazio/undefined
      if (!listId || !id) throw new NotAcceptableException();

      // Move a Task de uma Lista pra Outra
      const editedTask = await this.taskService.changeTaskList(id, {
        id: listId,
      });

      return ResponseUtil.sendResponse(
        res,
        HttpStatus.OK,
        'Task Moved Successfully!',
        editedTask,
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
  async deleteTask(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      await this.taskService.deleteTask(id);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.NO_CONTENT,
        'Task Deleted Successfully!',
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
