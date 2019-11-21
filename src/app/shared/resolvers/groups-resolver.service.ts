import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../services/data.service';
import { Group } from '../models/group';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupsResolver implements Resolve<Group[]>{
  currentUser: User;
  constructor(private dataSerive: DataService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Group[]> {
    const x = this.dataSerive.getGroupsByUserId(this.currentUser.id);
    return x;
   }
}

