import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Expense } from '../models/expense';
import { User } from '../models/user';
import { Group } from '../models/group';
import { Payer } from '../models/payer';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  friends: User[];
  groups: Group[];
  groupMembers: User[];
  selectedGroupId: number;
  expense: Expense;
  paidBy: User[];
  payer: Payer;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.expense = new Expense();
    this.payer = new Payer();
    const x = this.route.snapshot.data.resolvedData;
    this.friends = x.friends;
    this.groups = x.groups;
    this.paidBy = this.friends;
    console.log(JSON.stringify(this.friends));
    console.log(JSON.stringify(this.groups));
  }
  ngOnInit() {
  }
  async loadPaid() {
    console.log(this.expense.groupId);
    if (this.expense.groupId !== undefined) {
      await this.dataService.getGroupMembers(this.expense.groupId).then(
        (k) => {
          this.paidBy = k.members;
        }
      );
    } else {
      this.paidBy = this.friends;
    }
  }

}
