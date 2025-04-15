import 'dotenv/config'; // <-- isso carrega as variáveis do .env
import { DataSource } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Board } from '../database/entities/board.entity';
import { List } from '../database/entities/list.entity';
import { Task } from '../database/entities/task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Board, List, Task],
});