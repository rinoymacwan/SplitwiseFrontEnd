export class Payment {
  expenseName: string;
  from: number;
  fromName: string;
  to: number;
  toName: string;
  amount: number;
  lent: number;
  date: Date;

  constructor(expenseName: string, from: number, fromName: string, to: number, toName: string, amt: number, lent: number, date: Date) {
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
