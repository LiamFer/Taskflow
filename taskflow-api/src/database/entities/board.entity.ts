import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

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

  // Membros do Board
  @ManyToMany(() => User, (user) => user.boards)
  @JoinTable()
  members: User[];
}
