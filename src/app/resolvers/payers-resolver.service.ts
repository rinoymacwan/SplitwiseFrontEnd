import { Injectable } from '@angular/core';
import { Payer } from '../models/payer';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayersResolver implements Resolve<Payer[]> {
  constructor(private dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Payer[]> {
    return this.dataService.getPayers();
   }
}
