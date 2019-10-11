import { Group } from './group';
import { Payer } from './payer';
import { Payee } from './payee';
import { User } from './user';

export class Settlement {
  id: number;
  groupId: number;
  group: Group;
  payerId: number;
  payer: User;
  payeeId: number;
  payee: User;
  dateTime: Date;
  amount: number;
}
