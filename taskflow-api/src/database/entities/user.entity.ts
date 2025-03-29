import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // Boards que o usuário criou
  @OneToMany(() => Board, (board) => board.owner)
  ownedBoards: Board[];

  // Boards em que o usuário é membro
  @ManyToMany(() => Board, (board) => board.members)
  boards: Board[];
}
