import { Component, OnInit } from '@angular/core';
import { User } from './shared/models/user';
import { DataService } from './shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { Group } from './shared/models/group';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './shared/services/authentication.service';
import { MessageService } from 'primeng/api';
import * as signalR from '@aspnet/signalr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  title = 'SplitwiseFrontEnd';
  public friends: User[];
  public groups: Group[];
  login: boolean;
  msg: string;
  currentUser: User;
  // tslint:disable-next-line: max-line-length
  constructor(private messageService: MessageService, private authenticationService: AuthenticationService, private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.login = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('http://localhost:6700/notify')
      .build();

    connection.start().then(k =>  {
      console.log('Connected!');
    }).catch(err => {
      return console.error(err.toString());
    });

    connection.on('BroadcastMessage', (type: string, payload: string) => {
      this.messageService.add({ severity: type, summary: payload, detail: 'Via SignalR' });
    });

    this.router.events.subscribe(
      k => {
        this.fetchData();
      }
    );
  }
  fetchData() {
    this.dataService.getFriends(this.currentUser.id).subscribe(
      (frnds) => {
        this.friends = frnds;
      }
    );
    this.dataService.getGroupsByUserId(this.currentUser.id).subscribe(
      (grps) => {
        this.groups = grps;
      }
    );
  }
  // onLogin(form: NgForm) {
  //   console.log('login');
  // }
  // onRegister(form: NgForm) {
  //   console.log('register');
  // }
  logout() {
    console.log('logout');
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
