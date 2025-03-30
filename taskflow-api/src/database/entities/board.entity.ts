import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { List } from './list.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  // Dono do Board
  @ManyToOne(() => User, (user) => user.ownedBoards)
  owner: User;

  @OneToMany(() => List, (list) => list.board, { cascade: true })
  lists: List[];

  // Membros do Board
  @ManyToMany(() => User, (user) => user.boards)
  @JoinTable()
  members: User[];
}
