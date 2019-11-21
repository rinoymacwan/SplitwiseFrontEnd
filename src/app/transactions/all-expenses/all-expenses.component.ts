import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Expense } from '../../shared/models/expense';
import { Payer } from '../../shared/models/payer';
import { Payee } from '../../shared/models/payee';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent implements OnInit {

  public expenses: Expense[];
  public payers: Payer[];
  public payees: Payee[];

  constructor(private route: ActivatedRoute) {
    this.expenses = this.route.snapshot.data.resolvedExpenses;
    this.payers = this.route.snapshot.data.resolvedPayers;
    this.payees = this.route.snapshot.data.resolvedPayees;
  }

  ngOnInit() {
  }

}
