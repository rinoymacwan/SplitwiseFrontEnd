import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Group } from '../models/group';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'SplitwiseFrontEnd';
  public friends: User[];
  public groups: Group[];
  currentUser: User;
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.fetchData();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit(): void {
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
}
