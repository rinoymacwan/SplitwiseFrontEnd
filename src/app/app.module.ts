import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ActivityComponent } from './user/activity/activity.component';
import { AllExpensesComponent } from './transactions/all-expenses/all-expenses.component';
import { GroupsComponent } from './user/groups/groups.component';
import { FriendsComponent } from './user/friends/friends.component';
import { ExpensesComponent } from './transactions/expenses/expenses.component';
import { FriendComponent } from './user/friend/friend.component';
import { GroupComponent } from './user/group/group.component';
import { SettleUpComponent } from './transactions/settle-up/settle-up.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './shared/interceptors/jwt-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ActivityComponent,
    AllExpensesComponent,
    GroupsComponent,
    FriendsComponent,
    ExpensesComponent,
    GroupsComponent,
    FriendComponent,
    GroupComponent,
    SettleUpComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [AppComponent,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   *
   */
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/people_alt-24px.svg'));
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/people-24px.svg'));
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/person-24px.svg'));
  }
}
