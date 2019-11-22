import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SettleUpComponent } from './settle-up/settle-up.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AllExpensesComponent,
    ExpensesComponent,
    SettleUpComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class TransactionsModule { }
