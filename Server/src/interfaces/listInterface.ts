import { Board } from 'src/database/entities/board.entity';
import { Task } from 'src/database/entities/task.entity';

export interface list {
  id?: number;
  title: string;
  board: Board;
  tasks?: Task[];
}
