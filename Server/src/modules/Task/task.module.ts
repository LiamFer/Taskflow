import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../Auth/auth.service';
import { Board } from 'src/database/entities/board.entity';
import { List } from 'src/database/entities/list.entity';
import { Task } from 'src/database/entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';


@Module({
  imports: [TypeOrmModule.forFeature([Board,List,Task])],
  controllers: [TaskController],
  providers: [AuthService,TaskService],
})
export class TaskModule {}
