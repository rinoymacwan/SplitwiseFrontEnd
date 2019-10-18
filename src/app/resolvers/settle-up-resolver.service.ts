import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user';
import { DataService } from '../data.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettleUpResolver implements Resolve<any>{

  constructor(private dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const join = forkJoin([
      this.dataService.getFriends(1),
      this.dataService.getUser(1)
    ]).pipe(map((results) => {
      return {
        friends: results[0],
        user: results[1],
      };
    }));
    return join;
   }
}
