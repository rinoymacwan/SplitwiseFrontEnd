import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/user';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  user: User;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  async login(email: string, password: string): Promise<User> {
    const user1 = new User();
    user1.email = email;
    user1.password = password;
    const x = await this.http.post<User>('http://localhost:6700/api/Users/authenticate', user1).toPromise();
    console.log('AAA');
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    this.currentUserSubject.next(this.user);
    console.log('BBB');
    return x;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}

// k => {
//   this.user = k;
//   if (this.user.email !== null) {
//     console.log(this.user);
//     localStorage.setItem('currentUser', JSON.stringify(this.user));
//     this.currentUserSubject.next(this.user);
//     return x;
//   } else {
//     console.log('invalid user');
//     return x;
//   }
