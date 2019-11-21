import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ActivityComponent } from './user/activity/activity.component';
import { AllExpensesComponent } from './transactions/all-expenses/all-expenses.component';
import { GroupsComponent } from './user/groups/groups.component';
import { FriendsComponent } from './user/friends/friends.component';
import { ExpensesComponent } from './transactions/expenses/expenses.component';
import { ActivitiesResolver } from './shared/resolvers/activities-resolver.service';
import { ExpensesResolver } from './shared/resolvers/expenses-resolver.service';
import { PayersResolver } from './shared/resolvers/payers-resolver.service';
import { PayeesResolver } from './shared/resolvers/payees-resolver.service';
import { GroupsResolver } from './shared/resolvers/groups-resolver.service';
import { FriendsResolver } from './shared/resolvers/friends-resolver.service';
import { DashboardResolver } from './shared/resolvers/dashboard-resolver.service';
import { FriendComponent } from './user/friend/friend.component';
import { GroupComponent } from './user/group/group.component';
import { GroupResolver } from './shared/resolvers/group-resolver.service';
import { FriendResolver } from './shared/resolvers/friend-resolver.service';
import { AddEditExpensesResolver } from './shared/resolvers/add-edit-expenses-resolver.service';
import { SettleUpComponent } from './transactions/settle-up/settle-up.component';
import { SettleUpResolver } from './shared/resolvers/settle-up-resolver.service';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, resolve: {resolvedData: DashboardResolver}, runGuardsAndResolvers: 'always' },
  { path: 'activity', component: ActivityComponent, resolve: {resolvedData: ActivitiesResolver} },
  {
    path: 'allexpenses',
    component: AllExpensesComponent,
    resolve: {
      resolvedExpenses: ExpensesResolver,
      resolvedPayers: PayersResolver,
      resolvedPayees: PayeesResolver
    }
  },
  { path: 'groups', component: GroupsComponent, resolve: {resolvedData: GroupsResolver}, canActivate: [AuthGuard]  },
  { path: 'group/:id', component: GroupComponent, resolve: {resolvedData: GroupResolver}, canActivate: [AuthGuard]  },
  { path: 'friends', component: FriendsComponent, resolve: {resolvedData: FriendsResolver}, canActivate: [AuthGuard]  },
  { path: 'friend/:id', component: FriendComponent, resolve: {resolvedData: FriendResolver}, canActivate: [AuthGuard]  },
  { path: 'expenses/:id', component: ExpensesComponent, resolve: {resolvedData: AddEditExpensesResolver}, canActivate: [AuthGuard]  },
  { path: 'settleup', component: SettleUpComponent, resolve: {resolvedData: SettleUpResolver}, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, resolve: {resolvedData: DashboardResolver}, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
