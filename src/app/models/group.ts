import { User } from './user';

export class Group {
  id: number;
  name: string;
  madeById: number;
  user: User;
}
