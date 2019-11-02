import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupResolver implements Resolve<any> {
  currentUser: User;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (+route.params['id'] > 0) {
      const join = forkJoin([
        this.dataService.getGroup(route.params['id']),
        this.dataService.getExpenses(),
        this.dataService.getPayers(),
        this.dataService.getPayees(),
        this.dataService.getUser(this.currentUser.id)
      ]).pipe(map((results) => {
        return {
          group: results[0],
          expenses: results[1],
          payers: results[2],
          payees: results[3],
          currentUser: results[4]
        };
      }));
      return join;
    } else {
      const join = forkJoin([
        this.dataService.getFriends(this.currentUser.id),
        this.dataService.getUser(this.currentUser.id)
      ]).pipe(map((results) => {
        return {
          friends: results[0],
          currentUser: results[1]
        };
      }));
      return join;
    }
  }
}
