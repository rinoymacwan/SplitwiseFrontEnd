import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class GroupResolver implements Resolve<any> {
  constructor(private dataService: DataService, private route: ActivatedRoute) {
   }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (+route.params['id'] > 0) {
      const join = forkJoin([
        this.dataService.getGroup(route.params['id']),
        this.dataService.getExpenses(),
        this.dataService.getPayers(),
        this.dataService.getPayees(),
        this.dataService.getUser(1)
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
        this.dataService.getFriends(1),
        this.dataService.getUser(1)
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
