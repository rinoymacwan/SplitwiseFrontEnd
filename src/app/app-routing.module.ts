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
import { GroupComponent } from './group/group.component';
import { GroupResolver } from './resolvers/group-resolver.service';
import { FriendResolver } from './resolvers/friend-resolver.service';
import { AddEditExpensesResolver } from './resolvers/add-edit-expenses-resolver.service';
import { SettleUpComponent } from './settle-up/settle-up.component';
import { SettleUpResolver } from './resolvers/settle-up-resolver.service';
import { LoginComponent } from './login/login.component';


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
  { path: 'groups', component: GroupsComponent, resolve: {resolvedData: GroupsResolver} },
  { path: 'group/:id', component: GroupComponent, resolve: {resolvedData: GroupResolver} },
  { path: 'friends', component: FriendsComponent, resolve: {resolvedData: FriendsResolver} },
  { path: 'friend/:id', component: FriendComponent, resolve: {resolvedData: FriendResolver} },
  { path: 'expenses/:id', component: ExpensesComponent, resolve: {resolvedData: AddEditExpensesResolver} },
  { path: 'settleup', component: SettleUpComponent, resolve: {resolvedData: SettleUpResolver} },
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, resolve: {resolvedData: DashboardResolver} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// const routes: Routes = [
//   // tslint:disable-next-line: max-line-length

//   { path: 'login', component: LoginComponent, outlet: 'master' },
//   {
//     path: 'home', component: HomeComponent, outlet: 'master',
//     children: [
//       // tslint:disable-next-line: max-line-length
//       { path: 'dashboard', component: DashboardComponent, outlet: 'sub', resolve: { resolvedData: DashboardResolver }, runGuardsAndResolvers: 'always' },
//       { path: 'activity', component: ActivityComponent, outlet: 'sub', resolve: { resolvedData: ActivitiesResolver } },
//       {
//         path: 'allexpenses',
//         component: AllExpensesComponent,
//         outlet: 'sub',
//         resolve: {
//           resolvedExpenses: ExpensesResolver,
//           resolvedPayers: PayersResolver,
//           resolvedPayees: PayeesResolver
//         }
//       },
//       { path: 'groups', component: GroupsComponent, outlet: 'sub', resolve: { resolvedData: GroupsResolver } },
//       { path: 'group/:id', component: GroupComponent, outlet: 'sub', resolve: { resolvedData: GroupResolver } },
//       { path: 'friends', component: FriendsComponent, outlet: 'sub', resolve: { resolvedData: FriendsResolver } },
//       { path: 'friend/:id', component: FriendComponent, outlet: 'sub', resolve: { resolvedData: FriendResolver } },
//       { path: 'expenses/:id', component: ExpensesComponent, outlet: 'sub', resolve: { resolvedData: AddEditExpensesResolver } },
//       { path: 'settleup', component: SettleUpComponent, outlet: 'sub', resolve: { resolvedData: SettleUpResolver } },
//       // tslint:disable-next-line: max-line-length
//       { path: '', component: DashboardComponent, outlet: 'sub', resolve: { resolvedData: DashboardResolver }, runGuardsAndResolvers: 'always' },
//     ]
//   },
//   { path: '', component: LoginComponent, outlet: 'master', }
// ];
