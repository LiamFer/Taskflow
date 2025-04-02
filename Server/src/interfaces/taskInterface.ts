import { List } from 'src/database/entities/list.entity';

export interface task {
  id?: number;
  title: string;
  description: string;
  completed?: boolean;
  list: Partial<List>;
}
