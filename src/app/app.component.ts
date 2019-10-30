import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { DataService } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import { Group } from './models/group';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'SplitwiseFrontEnd';
  public friends: User[];
  public groups: Group[];
  login: boolean;
  msg: string;
  // tslint:disable-next-line: max-line-length
  constructor(private authenticationService: AuthenticationService, private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.login = true;
    // const user = JSON.parse(localStorage.getItem('currentUser'));
    // if (user === null) {
    //   this.login = false;
    // }
    // console.log(user);
    // if (this.router.getCurrentNavigation() !== null) {
    //   const x = this.router.getCurrentNavigation().extras.state.msg;
    //   if (x !== undefined && x === 'login successfull.') {
    //     this.fetchData();
    //     this.login = true;
    //     this.msg = x;
    //     console.log(this.msg);
    //   }
    // } else {
    //
    // }
  }
  ngOnInit(): void {
    this.router.events.subscribe(
      k => {
        this.fetchData();
      }
    );
  }
  fetchData() {
    this.dataService.getFriends(1).subscribe(
      (frnds) => {
        this.friends = frnds;
      }
    );
    this.dataService.getGroupsByUserId(1).subscribe(
      (grps) => {
        this.groups = grps;
      }
    );
  }
  onLogin(form: NgForm) {
    console.log('login');
    const x = this.authenticationService.login('rinoy@promactinfo.com', 'tvsgold').then(
      k => {
        console.log(k);
        console.log('xxxxxx');
        console.log(this.authenticationService.currentUserValue);
        this.router.navigate([''], { state: { msg: 'login successfull.' } });
      }
    );
  }
  onRegister(form: NgForm) {
    console.log('register');
  }
}
