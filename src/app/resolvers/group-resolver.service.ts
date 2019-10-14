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
    const join = forkJoin([
      this.dataService.getGroup(route.params['id']),
      this.dataService.getExpenses(),
      this.dataService.getPayers(),
      this.dataService.getPayees()
    ]).pipe(map((results) => {
      return {
        group: results[0],
        expenses: results[1],
        payers: results[2],
        payees: results[3]
      };
    }));
    return join;
  }
}
