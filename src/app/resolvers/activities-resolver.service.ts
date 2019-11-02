import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';
import { DataService } from '../data.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesResolver implements Resolve<Activity[]>{
  currentUser: User;
  constructor(private dataSerive: DataService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Activity[]> {
    const x = this.dataSerive.getActivities(this.currentUser.id);
    return x;
   }
}
