import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user';
import { DataService } from '../services/data.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SettleUpResolver implements Resolve<any>{
  currentUser: User;
  constructor(private dataService: DataService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const join = forkJoin([
      this.dataService.getFriends(this.currentUser.id),
      this.dataService.getUser(this.currentUser.id)
    ]).pipe(map((results) => {
      console.log(results[0]);
      return {
        friends: results[0],
        user: results[1],
      };
    }));
    return join;
   }
}
