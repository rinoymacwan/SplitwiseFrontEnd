export class Payment {
  expenseId: number;
  expenseName: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  amount: number;
  lent: number;
  date: Date;

  // tslint:disable-next-line: max-line-length
  constructor(expenseId: number, expenseName: string, from: string, fromName: string, to: string, toName: string, amt: number, lent: number, date: Date) {
    this.expenseId = expenseId;
    this.expenseName = expenseName;
    this.from = from;
    this.fromName = fromName;
    this.to = to;
    this.toName = toName;
    this.amount = amt;
    this.lent = lent;
    this.date = date;
  }
}
