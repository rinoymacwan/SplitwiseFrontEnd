import { User } from './user';

export class Payer {
  id: number;
  expenseId: number;
  payerId: number;
  payer: User;
  amountPaid: number;
  payerShare: number;
}
