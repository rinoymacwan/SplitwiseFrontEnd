import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { DataService } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import { Group } from './models/group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

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
