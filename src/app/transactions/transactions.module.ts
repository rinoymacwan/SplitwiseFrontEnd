import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SettleUpComponent } from './settle-up/settle-up.component';



@NgModule({
  declarations: [
    AllExpensesComponent,
    ExpensesComponent,
    SettleUpComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class TransactionsModule { }
