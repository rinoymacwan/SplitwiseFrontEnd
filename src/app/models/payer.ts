import { User } from './user';

export class Payer {
  id: number;
  expenseId: number;
  payerId: number;
  user: User;
  amountPaid: number;
  payerShare: number;
}
