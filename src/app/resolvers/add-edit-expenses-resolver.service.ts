import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
@Injectable({
  providedIn: 'root'
})
export class AddEditExpensesResolver implements Resolve<any> {

  userId: number;
  constructor(private dataService: DataService) {
    this.userId = 1;
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const join = forkJoin([
      this.dataService.getFriends(this.userId),
      this.dataService.getGroupsByUserId(this.userId)
    ]).pipe(map((results) => {
      return {
        friends: results[0],
        groups: results[1]
      };
    }));
    return join;
  }
}
