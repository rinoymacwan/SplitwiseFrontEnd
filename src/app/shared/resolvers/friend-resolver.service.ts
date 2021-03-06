import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Expense } from '../models/expense';
import { Payer } from '../models/payer';
import { Payee } from '../models/payee';
import { Settlement } from '../models/settlement';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FriendResolver implements Resolve<any> {
  expenses: Expense[];
  payers: Payer[];
  payees: Payee[];
  settlements: Settlement[];
  currentUser: User;
  constructor(private dataService: DataService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (+route.params['id'] === 0) {

    } else {
        const join = forkJoin([
        this.dataService.getExpenses(),
        this.dataService.getPayers(),
        this.dataService.getPayees(),
        this.dataService.getSettlementsByUserId(this.currentUser.id),
        this.dataService.getUser(route.params['id']),
        this.dataService.getUser(this.currentUser.id)
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
