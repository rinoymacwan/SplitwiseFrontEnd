import { Injectable } from '@angular/core';
import { Payer } from '../models/payer';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PayersResolver implements Resolve<Payer[]> {
  currentUser: User;
  constructor(private dataService: DataService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Payer[]> {
    return this.dataService.getPayersByPayerId(this.currentUser.id);
   }
}
