import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { DataService } from '../data.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  returnUrl: string;
  error: boolean;
  user: User;
  noMatchError: boolean;
  confirmPassword: string;
  msg: string;
  newUserCreated: boolean;
  // tslint:disable-next-line: max-line-length
  constructor(public myapp: AppComponent, private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.error = false;
    this.newUserCreated = false;
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
  }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.user = new User();
    this.msg = '';
  }
  onLogin(form: NgForm) {
    console.log('login');
    this.authenticationService.login(this.email, this.password).pipe(first())
    .subscribe(
        data => {
          this.myapp.fetchData();
          this.router.navigate([this.returnUrl]);
        },
        error => {
            console.log("ERROR!")
            this.msg = 'could not find your account. please try again.';
            this.error = true;
        });
  }
  onRegister(form: NgForm) {
    console.log('register');
    this.user.userName = this.user.email;
    if (this.user.password === this.confirmPassword) {
      console.log('match');
      this.dataService.addUser(this.user).then(
        k => {
          this.newUserCreated = true;
        }
      );


    } else {
      this.msg = 'passwords do not match.';
      this.error = true;
    }
  }
}
