import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Activity } from '../../shared/models/activity';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  public activities: Activity[];
  currentUser: User;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.activities = this.route.snapshot.data.resolvedData;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // this.dataService.getActivities(1).subscribe(
    //   (act) => {
    //     this.activities = act;      }
    // );
    // console.log(JSON.stringify(this.activities));
  }
  async onClear() {
    if (confirm('Are you sure you want to clear all activities?')) {
      this.activities = [];
      await this.dataService.clearActivities(this.currentUser.id);
    }
  }
}
