import { User } from './user';

export class Payer {
  id: number;
  expenseId: number;
  payerId: string;
  user: User;
  amountPaid: number;
  payerShare: number;
}
