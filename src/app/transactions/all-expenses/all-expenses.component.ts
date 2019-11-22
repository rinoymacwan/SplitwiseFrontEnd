import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Expense } from '../../shared/models/expense';
import { Payer } from '../../shared/models/payer';
import { Payee } from '../../shared/models/payee';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent implements OnInit {

  public allexpenses: Expense[];
  public expenses: Expense[];
  public payers: Payer[];
  public payees: Payee[];
  currentUser: User;
  constructor(private route: ActivatedRoute) {
    this.allexpenses = this.route.snapshot.data.resolvedExpenses;
    this.payers = this.route.snapshot.data.resolvedPayers;
    this.payees = this.route.snapshot.data.resolvedPayees;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.expenses = [];
  }

  ngOnInit() {
    this.payers.forEach(element => {
      if (element.payerId === this.currentUser.id) {
        const currentExpense = this.allexpenses.find(k => k.id === element.expenseId);
        this.expenses.push(currentExpense);

      }
    });

    this.payees.forEach(element => {
      if (element.payeeId === this.currentUser.id) {
        const currentExpense = this.allexpenses.find(k => k.id === element.expenseId);
        if (!this.expenses.includes(currentExpense)) {
          this.expenses.push(currentExpense);
        }
      }
    });
  }

}
