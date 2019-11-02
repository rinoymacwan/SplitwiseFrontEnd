import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Payee } from '../models/payee';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PayeesResolver implements Resolve<Payee[]> {
  currentUser: User;
  constructor(private dataService: DataService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Payee[]> {
    return this.dataService.getPayeesByPayeeId(this.currentUser.id);
   }
}
