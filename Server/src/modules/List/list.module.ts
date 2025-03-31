import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../Auth/auth.service';
import { Board } from 'src/database/entities/board.entity';
import { List } from 'src/database/entities/list.entity';
import { Task } from 'src/database/entities/task.entity';
import { ListController } from './list.controller';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board,List,Task])],
  controllers: [ListController],
  providers: [AuthService,ListService],
})
export class ListModule {}
