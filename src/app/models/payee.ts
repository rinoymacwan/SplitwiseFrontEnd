import { User } from './user';

export class Payee {
  id: number;
  expenseId: number;
  payeeId: number;
  user: User;
  payeeShare: number;
}
