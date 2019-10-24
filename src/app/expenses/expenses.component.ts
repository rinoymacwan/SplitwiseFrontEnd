import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Expense } from '../models/expense';
import { User } from '../models/user';
import { Group } from '../models/group';
import { Payer } from '../models/payer';
import { NgForm } from '@angular/forms';
import { Category } from '../models/category';
import { Payee } from '../models/payee';
import { Activity } from '../models/activity';

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
  payee: Payee;
  payers: Payer[];
  payees: Payee[];
  userId: number;
  categories: Category[];
  selectedFriend: User;
  expenseBetween: User[];
  isIndividual: boolean;
  flag: boolean;
  selectedUsers: User[];
  currentUser: User;
  equalShare: number[];
  percentageShare: number[];
  selectedFriendShare: number;
  myShare: number;
  finalMyShare: number;
  finalSelectedFriendShare: number;
  newExpense: boolean;
  notes: boolean;
  activity: Activity;
  addedByName: string;
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    // common
    this.expense = new Expense();
    this.flag = false;
    const x = this.route.snapshot.data.resolvedData;
    this.notes = false;
    this.activity = new Activity(0, '', new Date(Date.now()));
    this.isIndividual = true;
    const param = this.route.snapshot.paramMap.get('id');
    this.userId = 1;

    // individual
    this.payer = new Payer();
    this.payee = new Payee();

    // group
    this.payers = [];
    this.payees = [];

    this.friends = x.friends;
    this.expenseBetween = this.friends;
    this.groups = x.groups;
    this.categories = x.categories;
    this.currentUser = x.user;
    this.paidBy = this.friends;

    this.selectedFriend = new User();
    this.selectedFriendShare = 0;

    this.selectedUsers = [];
    this.equalShare = [];
    this.percentageShare = [];
    this.myShare = 0;
    this.finalMyShare = 0;
    this.finalSelectedFriendShare = 0;


    if (+param === 0) {
      console.log('NEW EXPENSE');
      this.newExpense = true;
    } else {
      this.newExpense = false;
      this.expense = x.expense;
      this.payers = x.payers;
      this.payees = x.payees;
      this.payer = this.payers.find(k => this.expense.id === k.expenseId);
      this.payees = this.payees.filter(k => k.expenseId === this.expense.id);
      const temp = this.friends.find(k => k.id === this.expense.addedById);
      if (temp === undefined) {
        this.addedByName = 'You';
      } else {
        this.addedByName = temp.name;
      }
    }
  }
  ngOnInit() {
  }
  async loadPaid() {
    // console.log(this.expense.groupId);
    this.equalShare = [];
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
  async onSubmit(form: NgForm) {
    console.log('form submit');
    this.expense.addedById = this.userId;
    await this.dataService.AddExpense(this.expense).then(
      k => {
        this.expense = k;
      }
    );
    console.log('expense:');
    console.log(JSON.stringify(this.expense));

    if (this.isIndividual === true) {
      // individual expenses
      // commmon

      this.payer.expenseId = this.expense.id;
      this.payee.expenseId = this.expense.id;
      this.payer.amountPaid = this.expense.total;
      console.log('USERID: ' + this.userId);
      console.log('PAYERID: ' + this.payer.payerId);
      console.log('PAYEEID: ' + this.payee.payeeId);

      // I Paid
      if (+this.payer.payerId === +this.userId) {
        this.payer.payerShare = this.finalMyShare;
        this.payee.payeeId = this.selectedFriend.id;
        this.payee.payeeShare = this.finalSelectedFriendShare;
        console.log('I paid');
      } else {
        // Other Guy Paid
        this.payer.payerShare = this.finalSelectedFriendShare;
        this.payee.payeeId = this.userId;
        this.payee.payeeShare = this.finalMyShare;
        console.log('Other guy paid');
      }
      console.log('PAYER:');
      console.log(JSON.stringify(this.payer));
      this.dataService.AddPayer(this.payer);
      console.log('PAYEE:');
      console.log(JSON.stringify(this.payee));
      this.dataService.AddPayee(this.payee);
      // tslint:disable-next-line: max-line-length
      this.activity.description = this.currentUser.name + ' added ' + this.expense.description + ' with ' + this.selectedFriend.name;

    } else { // group expenses
      this.payer.expenseId = this.expense.id;
      this.payer.amountPaid = this.expense.total;
      this.payer.payerShare = this.equalShare[this.payer.payerId];
      this.dataService.AddPayer(this.payer);
      for (const x of this.selectedUsers) {
        this.payee.expenseId = this.expense.id;
        this.payee.payeeId = x.id;
        this.payee.payeeShare = this.equalShare[x.id];
        this.dataService.AddPayee(this.payee);
      }
      // tslint:disable-next-line: max-line-length
      this.activity.description = this.currentUser.name + ' added ' + this.expense.description + ' to ' + this.groups.find(k => k.id === this.expense.groupId).name + ' group. ';

    }
    this.activity.userId = this.userId;
    this.activity.dateTime = this.expense.dateTime;

    this.dataService.addActivity(this.activity);
    this.router.navigate([''], { state: { msg: 'Expense added.' } });
  }
  addUser(id: number) {
    console.log(id);
    this.flag = true;
    this.selectedFriend = this.friends.find(k => k.id === +id);
    console.log(JSON.stringify(this.selectedFriend));
    this.paidBy = [];
    this.paidBy.push(this.selectedFriend);
  }
  onCheck(checked: boolean, id: number) {
    console.log(checked + '|' + id);
    if (checked === true) {
      if (id === this.userId) {
        this.selectedUsers.push(this.currentUser);
      } else {
        this.selectedUsers.push(this.friends.find(k => k.id === id));
      }
    } else {
      // delete
      const x = this.selectedUsers.find(k => k.id === id);
      this.selectedUsers = this.selectedUsers.filter(k => k !== x);
    }
    this.onSplit();
    // console.log(JSON.stringify(this.selectedUsers));
  }
  onIndividual() {

  }
  toggleNotes() {
    this.notes = !this.notes;
  }
  async delete() {
    if (confirm('Are you sure you want to delete this expense?')) {
      await this.dataService.deleteExpense(this.expense);
      this.router.navigate([''], { state: { msg: 'Expense deleted.' } });
    }
  }
  onSplit() {
    // console.log(this.expense.splitBy);
    if (this.isIndividual === true) {
      if (this.expense.splitBy === 'equally') {
        this.myShare = this.expense.total / 2;
        this.selectedFriendShare = this.expense.total / 2;
        this.finalMyShare = this.myShare;
        this.finalSelectedFriendShare = this.selectedFriendShare;
      } else if (this.expense.splitBy === 'by percentage') {
        this.finalMyShare = this.expense.total * (this.myShare / 100);
        this.finalSelectedFriendShare = this.expense.total * (this.selectedFriendShare / 100);
      } else if (this.expense.splitBy === 'unequally') {
        this.finalMyShare = this.myShare;
        this.finalSelectedFriendShare = this.selectedFriendShare;
      }
      console.log(this.finalMyShare + '|' + this.finalSelectedFriendShare);
    } else {
      if (this.expense.splitBy === 'equally') {
        this.equalShare = [];
        const numberOfMembers = this.selectedUsers.length;
        for (const x of this.selectedUsers) {
          this.equalShare[x.id] = this.expense.total / numberOfMembers;
        }
        console.log(this.equalShare);
      } else if (this.expense.splitBy === 'by percentage') {
        this.percentageShare = [];
        for (const x of this.selectedUsers) {
          this.percentageShare[x.id] = this.expense.total * (this.equalShare[x.id] / 100);
          console.log(this.percentageShare);
        }
      } else if (this.expense.splitBy === 'unequally') {
      }
    }
  }
  onPaidByChange() {
    console.log(this.payer.payerId);
  }
}
