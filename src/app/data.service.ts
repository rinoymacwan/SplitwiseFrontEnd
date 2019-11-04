import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Activity } from './models/activity';
import { Observable } from 'rxjs';
import { Expense } from './models/expense';
import { Payee } from './models/payee';
import { Payer } from './models/payer';
import { Group } from './models/group';
import { User } from './models/user';
import { Settlement } from './models/settlement';
import { Category } from './models/category';
import { GroupMemberMapping } from './models/group-member-mapping';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getActivities(UserId: string): Observable<Activity[]> {
    const x = this.http.get<Activity[]>('http://localhost:6700/api/Activities/ByUserId/' + UserId);
    return x;
  }
  getExpenses(): Observable<Expense[]> {
    const x = this.http.get<Expense[]>('http://localhost:6700/api/Expenses');
    return x;
  }
  getPayersByPayerId(id: string): Observable<Payer[]> {
    const x = this.http.get<Payer[]>('http://localhost:6700/api/Payers/ByPayerId/' + id);
    return x;
  }
  getPayersByExpenseId(id: number): Observable<Payer[]> {
    const x = this.http.get<Payer[]>('http://localhost:6700/api/Payers/ByExpenseId/' + id);
    return x;
  }
  getPayeesByPayeeId(id: string): Observable<Payee[]> {
    const x = this.http.get<Payee[]>('http://localhost:6700/api/Payees/ByPayeeId/' + id);
    return x;
  }
  getPayeesByExpenseId(id: number): Observable<Payee[]> {
    const x = this.http.get<Payee[]>('http://localhost:6700/api/Payees/ByExpenseId/' + id);
    return x;
  }
  getPayers(): Observable<Payer[]> {
    const x = this.http.get<Payer[]>('http://localhost:6700/api/Payers');
    return x;
  }
  getPayees(): Observable<Payee[]> {
    const x = this.http.get<Payee[]>('http://localhost:6700/api/Payees');
    return x;
  }
  getGroupsByUserId(id: string): Observable<Group[]> {
    const x = this.http.get<Group[]>('http://localhost:6700/api/Groups/ByUserId/' + id);
    // console.log(JSON.stringify(x));
    return x;
  }
  getFriends(id: string): Observable<User[]> {
    const x = this.http.get<User[]>('http://localhost:6700/api/Users/' + id + '/friends');
    // console.log(JSON.stringify(x));
    return x;
  }
  getSettlementsByUserId(id: string): Observable<Settlement[]> {
    const x = this.http.get<Settlement[]>('http://localhost:6700/api/Settlements/GetByUserId/' + id);
    // console.log(JSON.stringify(x));
    return x;
  }
  getGroup(id: number): any {
    const x = this.http.get<any>('http://localhost:6700/api/Groups/' + id);
    return x;
  }
  getUser(id: string): Observable<User> {
    const x = this.http.get<any>('http://localhost:6700/api/Users/' + id);
    return x;
  }
  getGroupMembers(id: number): Promise<any> {
    const x = this.http.get<any>('http://localhost:6700/api/Groups/' + id).toPromise();
    return x;
  }
  getCategories(): Observable<Category[]> {
    const x = this.http.get<Category[]>('http://localhost:6700/api/Categories');
    // console.log(JSON.stringify(x));
    return x;
  }
  async AddExpense(expense: Expense): Promise<Expense>{
    return await this.http.post<Expense>('http://localhost:6700/api/Expenses', expense).toPromise();
  }
  async AddPayer(payer: Payer) {
    await this.http.post('http://localhost:6700/api/Payers', payer).toPromise();
  }
  async AddPayee(payee: Payee) {
    await this.http.post('http://localhost:6700/api/Payees', payee).toPromise();
  }
  async addSettlement(settlement: Settlement) {
    await this.http.post('http://localhost:6700/api/Settlements', settlement).toPromise();
  }
  async addActivity(activity: Activity) {
    await this.http.post('http://localhost:6700/api/Activities', activity).toPromise();
  }
  async addGroup(group: Group): Promise<Group> {
    return await this.http.post<Group>('http://localhost:6700/api/Groups', group).toPromise();
  }
  async addGroupMemberMapping(groupMemberMapping: GroupMemberMapping) {
    await this.http.post('http://localhost:6700/api/GroupMemberMappings', groupMemberMapping).toPromise();
  }
  getExpense(id: number): Observable<Expense>{
    return this.http.get<Expense>('http://localhost:6700/api/Expenses/' + id);
  }
  async deleteExpense(expense: Expense): Promise<Expense> {
    return await this.http.delete<Expense>('http://localhost:6700/api/Expenses/' + expense.id).toPromise();
  }
  async deleteSettlement(id: number): Promise<any> {
    return await this.http.delete<any>('http://localhost:6700/api/Settlements/' + id).toPromise();
  }
  async deleteFriend(removeList: User[]): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return await this.http.delete<any>('http://localhost:6700/api/UserFriendMappings/delete?user1=' + removeList[0].id + '&user2=' + removeList[1].id).toPromise();
  }
  async clearActivities(userId: string) {
    return await this.http.delete('http://localhost:6700/api/Activities/ByUserId/' + userId).toPromise();
  }
  async deleteGroup(id: number): Promise<Group> {
    return await this.http.delete<Group>('http://localhost:6700/api/Groups/' + id).toPromise();
  }
  async addFriend(email: string, userId: string): Promise<boolean> {
    // tslint:disable-next-line: max-line-length
    const x = new User();
    x.email = email;
    return await this.http.post<boolean>('http://localhost:6700/api/UserFriendMappings/ByEmail/' + userId, x).toPromise();
  }
  async addUser(user: User): Promise<User> {
    return await this.http.post<User>('http://localhost:6700/api/Users', user).toPromise();
  }
}

