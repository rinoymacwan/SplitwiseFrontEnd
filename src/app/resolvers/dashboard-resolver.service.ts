import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Expense } from '../models/expense';
import { Payer } from '../models/payer';
import { Payee } from '../models/payee';
import { Settlement } from '../models/settlement';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<any> {
  expenses: Expense[];
  payers: Payer[];
  payees: Payee[];
  settlements: Settlement[];
  currentUser: User;
  constructor(private dataService: DataService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // this.dataService.getExpenses().subscribe(exp => {
    //   this.expenses = exp;
    // });
    // this.dataService.getPayersByPayerId(this.userId).subscribe(pyr => {
    //   this.payers = pyr;
    // });
    // this.dataService.getPayeesByPayeeId(this.userId).subscribe(pye => {
    //   this.payees = pye;
    // });
    // this.dataService.getSettlementsByUserId(this.userId).subscribe(set => {
    //   this.settlements = set;
    // });
    const join = forkJoin([
      this.dataService.getExpenses(),
      this.dataService.getPayers(),
      this.dataService.getPayees(),
      this.dataService.getSettlementsByUserId(this.currentUser.id)
    ]).pipe(map((results) => {
      return {
        expenses: results[0],
        payers: results[1],
        payees: results[2],
        settlements: results[3]
      };
    }));
    return join;
  }
}
