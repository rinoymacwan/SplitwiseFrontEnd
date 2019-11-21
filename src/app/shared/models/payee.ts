import { User } from './user';

export class Payee {
  id: number;
  expenseId: number;
  payeeId: string;
  user: User;
  payeeShare: number;
}
