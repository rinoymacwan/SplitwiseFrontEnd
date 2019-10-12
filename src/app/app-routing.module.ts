import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityComponent } from './activity/activity.component';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { GroupsComponent } from './groups/groups.component';
import { FriendsComponent } from './friends/friends.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ActivitiesResolver } from './resolvers/activities-resolver.service';
import { ExpensesResolver } from './resolvers/expenses-resolver.service';
import { PayersResolver } from './resolvers/payers-resolver.service';
import { PayeesResolver } from './resolvers/payees-resolver.service';
import { GroupsResolver } from './resolvers/groups-resolver.service';
import { FriendsResolver } from './resolvers/friends-resolver.service';
import { DashboardResolver } from './resolvers/dashboard-resolver.service';
import { FriendComponent } from './friend/friend.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, resolve: {resolvedData: DashboardResolver} },
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
  { path: 'groups', component: GroupsComponent, resolve: {resolvedData: GroupsResolver} },
  { path: 'friends', component: FriendsComponent, resolve: {resolvedData: FriendsResolver} },
  { path: 'friend/:id', component: FriendComponent, resolve: {resolvedData: DashboardResolver} },
  { path: 'expenses', component: ExpensesComponent },
  { path: '', component: DashboardComponent, resolve: {resolvedData: DashboardResolver} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
