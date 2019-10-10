import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  public expenses: Expense[];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.expenses = this.route.snapshot.data.resolvedData;
    console.log(JSON.stringify(this.expenses));
  }
  ngOnInit() {
  }

}
