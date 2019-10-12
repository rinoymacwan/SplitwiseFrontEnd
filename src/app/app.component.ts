import { Component } from '@angular/core';
import { User } from './models/user';
import { DataService } from './data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SplitwiseFrontEnd';
  public friends: User[];
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.dataService.getFriends(1).subscribe(
      (frnds) => {
        this.friends = frnds;
      }
    );
  }
}
