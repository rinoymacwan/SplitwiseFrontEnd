import { Group } from './group';
import { User } from './user';
import { Category } from './category';

export class Expense {
  id: number;
  groupId: number;
  group: Group;
  addedById: string;
  user: User;
  dateTime: Date;
  categoryId: number;
  category: Category;
  currency: string;
  total: number;
  splitBy: string;
  description: string;
  notes: string;
}
