// src/lists/list.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Board } from './board.entity';
import { Task } from './task.entity';


@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // Relacionamento: uma lista pertence a um Board
  @ManyToOne(() => Board, (board) => board.lists, { onDelete: 'CASCADE' })
  board: Board;

  // Relacionamento: uma lista pode ter várias Tarefas
  @OneToMany(() => Task, (task) => task.list, { cascade: true })
  tasks: Task[];
}
