import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendComponent } from './friend/friend.component';
import { FriendsComponent } from './friends/friends.component';
import { GroupComponent } from './group/group.component';
import { GroupsComponent } from './groups/groups.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ActivityComponent,
    DashboardComponent,
    FriendComponent,
    FriendsComponent,
    GroupComponent,
    GroupsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UserModule { }
