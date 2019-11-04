export class Activity {
  id: number;
  userId: string;
  description: string;
  dateTime: Date;
  /**
   *
   */
  constructor(userId: string, description: string, dateTime: Date) {
    this.userId = userId;
    this.description = description;
    this.dateTime = dateTime;
  }
}
