import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Expense } from '../models/expense';
import { User } from '../models/user';
import { Group } from '../models/group';
import { Payer } from '../models/payer';
import { NgForm } from '@angular/forms';
import { Category } from '../models/category';

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
  userId: number;
  categories: Category[];
  selectedFriend: User;
  expenseBetween: User[];
  isPartOfExpense: boolean[];
  isIndividual: boolean;
  flag: boolean;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.expense = new Expense();
    this.flag = false;
    this.payer = new Payer();
    const x = this.route.snapshot.data.resolvedData;
    this.friends = x.friends;
    this.expenseBetween = this.friends;
    this.groups = x.groups;
    this.categories = x.categories;
    this.paidBy = this.friends;
    this.userId = 1;
    this.selectedFriend = new User();
    this.isIndividual = true;
    console.log(JSON.stringify(this.friends));
    console.log(JSON.stringify(this.groups));
  }
  ngOnInit() {
  }
  async loadPaid() {
    console.log(this.expense.groupId);
    if (this.expense.groupId !== undefined && this.expense.groupId > 0) {
      await this.dataService.getGroupMembers(this.expense.groupId).then(
        (k) => {
          this.paidBy = k.members.filter(k => k.id !== this.userId);
          this.expenseBetween = k.members.filter(k => k.id !== this.userId);
          this.isIndividual = false;
        }
      );
    } else {
      this.paidBy = this.friends;
      this.expenseBetween = this.friends;
      this.isIndividual = true;
    }
  }
  onSubmit(form: NgForm) {
    console.log("form submit");
    this.expense.addedById = this.userId;
    console.log(JSON.stringify(this.expense));
  }
  addUser(id: number) {
    console.log(id);
    this.flag = true;
    this.selectedFriend = this.friends.find(k => k.id === +id);
    console.log(JSON.stringify(this.selectedFriend));
  }
  onCheck(checked: boolean, userId: number) {
    console.log(checked + "|" + userId);
  }
}
