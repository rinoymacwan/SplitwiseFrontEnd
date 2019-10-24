export class Activity {
  id: number;
  userId: number;
  description: string;
  dateTime: Date;
  /**
   *
   */
  constructor(userId: number, description: string, dateTime: Date) {
    this.userId = userId;
    this.description = description;
    this.dateTime = dateTime;
  }
}
