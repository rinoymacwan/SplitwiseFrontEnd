import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }
  onLogin(form: NgForm) {
    console.log('login');
    const x = this.authenticationService.login('rinoy@promactinfo.com', 'tvsgold').then(
      k => {
        console.log(k);
        this.router.navigate([{ outlets: { master: ['home'] } }]);
      }
    );
  }
  onRegister(form: NgForm) {
    console.log('register');
  }

}
