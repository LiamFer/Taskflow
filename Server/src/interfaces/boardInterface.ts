import { User } from "src/database/entities/user.entity";

export interface board {
  id?: number;
  title: string;
  description: string;
  owner: User;
  members?: User[]
}
