import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesResolver implements Resolve<Activity[]>{

  constructor(private dataSerive: DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Activity[]> {
    const x = this.dataSerive.getActivities(1);
    return x;
   }
}
