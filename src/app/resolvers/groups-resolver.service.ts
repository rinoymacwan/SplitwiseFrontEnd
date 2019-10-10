import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Group } from '../models/group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsResolver implements Resolve<Group[]>{

  constructor(private dataSerive: DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Group[]> {
    const x = this.dataSerive.getGroupsByUserId(1);
    return x;
   }
}

