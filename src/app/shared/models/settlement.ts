import { Group } from './group';
import { Payer } from './payer';
import { Payee } from './payee';
import { User } from './user';

export class Settlement {
  id: number;
  groupId: number;
  group: Group;
  payerId: string;
  payer: User;
  payeeId: string;
  payee: User;
  dateTime: Date;
  amount: number;
}
