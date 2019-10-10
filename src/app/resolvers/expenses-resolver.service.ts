import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of} from 'rxjs';
import { Expense } from '../models/expense';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesResolver  implements Resolve<Observable<Expense[]>> {

  constructor(private dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Expense[]> {
    const expenses = this.dataService.getExpenses();
    return expenses;
   }
}
