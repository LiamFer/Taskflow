import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../Auth/auth.service';
import { Board } from 'src/database/entities/board.entity';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { List } from 'src/database/entities/list.entity';
import { Task } from 'src/database/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board,List,Task])],
  controllers: [BoardController],
  providers: [AuthService,BoardService],
})
export class BoardModule {}
