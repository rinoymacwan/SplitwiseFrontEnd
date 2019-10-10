import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public groups: Group[];
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.groups = this.route.snapshot.data.resolvedData;
    console.log(JSON.stringify(this.groups));
   }

  ngOnInit() {
  }

}
