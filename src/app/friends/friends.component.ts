import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public friends: User[];
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.friends = this.route.snapshot.data.resolvedData;
    // console.log(JSON.stringify(this.friends));
   }
  ngOnInit() {
  }

}
