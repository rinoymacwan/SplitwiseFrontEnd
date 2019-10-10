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

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.activities = this.route.snapshot.data.resolvedData;
  }

  ngOnInit() {
    // this.dataService.getActivities(1).subscribe(
    //   (act) => {
    //     this.activities = act;      }
    // );
    // console.log(JSON.stringify(this.activities));
  }

}
