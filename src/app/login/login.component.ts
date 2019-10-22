import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  onLogin(form: NgForm) {
    console.log('login');
    const x = this.authenticationService.login('rinoy@promactinfo.com', 'tvsgold').then(
      k => {
        console.log(k);
      }
    );
  }
  onRegister(form: NgForm) {
    console.log('register');
  }

}
