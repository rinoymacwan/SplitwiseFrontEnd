import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../models/group';
import { GroupsResolver } from '../resolvers/groups-resolver.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  msgExists: boolean;
  msg: string;
  public groups: Group[];
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    const param = this.route.snapshot.paramMap.get('id');

    this.groups = this.route.snapshot.data.resolvedData;
    if (this.router.getCurrentNavigation().extras.state !== undefined) {
      this.msg = this.router.getCurrentNavigation().extras.state.msg;
      this.msgExists = true;
    } else {
      this.msgExists = false;
    }
    // console.log(JSON.stringify(this.groups));
  }

  ngOnInit() {
  }

}
