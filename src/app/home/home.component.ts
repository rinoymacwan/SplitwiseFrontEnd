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
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.fetchData();
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
}
