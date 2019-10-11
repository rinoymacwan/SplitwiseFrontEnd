import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Payee } from '../models/payee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayeesResolver implements Resolve<Payee[]> {
  constructor(private dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Payee[]> {
    return this.dataService.getPayeesByPayeeId(1);
   }
}
