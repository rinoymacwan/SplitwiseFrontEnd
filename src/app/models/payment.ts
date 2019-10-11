export class Payment {
  from: number;
  fromName: string;
  to: number;
  toName: string;
  amount: number;
  /**
   *
   */
  constructor(from: number, fromName: string, to: number, toName: string, amt: number) {
    this.from = from;
    this.fromName = fromName;
    this.to = to;
    this.toName = toName;
    this.amount = amt;
  }
}
