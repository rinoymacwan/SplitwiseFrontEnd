import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from './models/activity';
import { Observable } from 'rxjs';
import { Expense } from './models/expense';
import { Payee } from './models/payee';
import { Payer } from './models/payer';
import { Group } from './models/group';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getActivities(UserId: number): Observable<Activity[]> {
    const x = this.http.get<Activity[]>('http://localhost:6700/api/Activities/ByUserId/' + UserId);
    return x;
  }
  getExpenses(): Observable<Expense[]> {
    const x = this.http.get<Expense[]>('http://localhost:6700/api/Expenses');
    return x;
  }
  getPayers(): Observable<Payer[]> {
    const x = this.http.get<Payer[]>('http://localhost:6700/api/Payers');
    return x;
  }
  getPayersByExpenseId(id: number): Observable<Payer[]> {
    const x = this.http.get<Payer[]>('http://localhost:6700/api/Payers/ByExpenseId/' + id);
    return x;
  }
  getPayees(): Observable<Payee[]> {
    const x = this.http.get<Payee[]>('http://localhost:6700/api/Payees');
    return x;
  }
  getPayeesByExpenseId(id: number): Observable<Payee[]> {
    const x = this.http.get<Payee[]>('http://localhost:6700/api/Payees/ByExpenseId/' + id);
    return x;
  }
  getGroupsByUserId(id: number): Observable<Group[]> {
    const x = this.http.get<Group[]>('http://localhost:6700/api/Groups/ByUserId/' + id);
    console.log(JSON.stringify(x));
    return x;
  }
  getFriends(id: number): Observable<User[]> {
    const x = this.http.get<User[]>('http://localhost:6700/api/Users/' + id + '/friends');
    console.log(JSON.stringify(x));
    return x;
  }
}

