import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../Auth/auth.service';
import { Board } from 'src/database/entities/board.entity';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { List } from 'src/database/entities/list.entity';
import { Task } from 'src/database/entities/task.entity';
import { UserService } from '../User/user.service';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board,List,Task,User])],
  controllers: [BoardController],
  providers: [AuthService,BoardService,UserService],
})
export class BoardModule {}
