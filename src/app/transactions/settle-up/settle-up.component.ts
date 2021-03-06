import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Settlement } from '../../shared/models/settlement';
import { Activity } from '../../shared/models/activity';
import { SignalRService } from 'src/app/shared/services/signal-r.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrls: ['./settle-up.component.css']
})
export class SettleUpComponent implements OnInit {

  public friends: User[];

  settlement: Settlement;
  activity: Activity;
  currentUser: User;
  listOfUsers: string[];
  // tslint:disable-next-line: max-line-length
  constructor(private signalRService: SignalRService, private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.friends = [];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.activity = new Activity('0', '', new Date(Date.now()));
    this.settlement = new Settlement();
    this.friends = this.route.snapshot.data.resolvedData.friends;
    this.friends.push(this.currentUser);
    this.listOfUsers = [];
    // console.log(JSON.stringify(this.friends));
  }
  ngOnInit() {
  }
  onSubmit() {
    this.activity.dateTime = this.settlement.dateTime;
    this.activity.userId = this.currentUser.id;
    const payerName = this.friends.find(k => k.id === this.settlement.payerId).name;
    const payeeName = this.friends.find(k => k.id === this.settlement.payeeId).name;
    this.activity.description = payerName + ' paid Rs.' + this.settlement.amount + ' to ' + payeeName;
    // console.log(this.activity.description);
    this.dataService.addSettlement(this.settlement);
    // this.currentUser.idmight be wrong here.
    // tslint:disable-next-line: max-line-length
    this.dataService.addActivity(new Activity(this.currentUser.id, payerName + ' paid Rs.' + this.settlement.amount + ' to ' + payeeName, this.settlement.dateTime));

    const str = `${this.currentUser.name} added a settlement with you.` ;
    this.listOfUsers.push(this.settlement.payeeId);
    this.listOfUsers.push(this.settlement.payerId);

    this.listOfUsers = this.listOfUsers.filter(k => k !== this.currentUser.id);

    this.signalRService.SendMessages(str, this.listOfUsers);

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard'], { state: { msg: 'Settlement added.' } });
    });
  }
}
