import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Expense } from '../models/expense';
import { Payer } from '../models/payer';
import { Payee } from '../models/payee';
import { Settlement } from '../models/settlement';

@Injectable({
  providedIn: 'root'
})
export class FriendResolver implements Resolve<any> {
  expenses: Expense[];
  payers: Payer[];
  payees: Payee[];
  settlements: Settlement[];
  userId: number;
  constructor(private dataService: DataService) {
    this.userId = 1;
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (+route.params['id'] === 0) {

    } else {
        const join = forkJoin([
        this.dataService.getExpenses(),
        this.dataService.getPayers(),
        this.dataService.getPayees(),
        this.dataService.getSettlementsByUserId(this.userId),
        this.dataService.getUser(route.params['id']),
        this.dataService.getUser(1)
      ]).pipe(map((results) => {
        return {
          expenses: results[0],
          payers: results[1],
          payees: results[2],
          settlements: results[3],
          friend: results[4],
          currentUser: results[5]
        };
      }));
        return join;

    }

  }
}
