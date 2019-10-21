import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Activity } from '../models/activity';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  public activities: Activity[];
  userId: number;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.activities = this.route.snapshot.data.resolvedData;
    this.userId = 1;
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
      await this.dataService.clearActivities(this.userId);
    }
  }
}
