import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../models/group';
import { User } from '../models/user';
import { Expense } from '../models/expense';
import { Payee } from '../models/payee';
import { Payer } from '../models/payer';
import { Payment } from '../models/payment';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { GroupMemberMapping } from '../models/group-member-mapping';
import { Activity } from '../models/activity';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group: Group;
  groupId: number;
  members: User[];
  userId: number;
  expenses: Expense[];
  payers: Payer[];
  payees: Payee[];
  payer: Payer;
  payee: Payee;
  payments: Payment[];
  isNew: boolean;
  friends: User[];
  currentUser: User;
  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {
    const x = this.route.snapshot.data.resolvedData;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.userId = 1;
    this.groupId = +this.route.snapshot.paramMap.get('id');
    if (this.groupId > 0) {
      this.isNew = false;
      this.expenses = x.expenses;
      this.payers = x.payers;
      this.payees = x.payees;
      this.group = x.group.group;
      this.members = x.group.members;
      this.members = this.members.filter(k => k.id !== this.userId);
      this.currentUser = x.currentUser;
    } else {
      this.isNew = true;
      this.friends = x.friends;
      this.currentUser = x.currentUser;
      this.members = [];
      this.members.push(this.currentUser);
      this.group = new Group();
    }
    console.log(this.isNew);
    // console.log(JSON.stringify(this.group));
    // console.log(JSON.stringify(this.members));
    this.payments = [];
    this.group.madeById = this.userId;
  }

  ngOnInit() {
    if (this.isNew === false) {
      this.expenses = this.expenses.filter(k => k.groupId === this.group.id);
      // console.log(JSON.stringify(this.expenses));
      // console.log(JSON.stringify(this.payees));
      for (const expense of this.expenses) {
        this.payer = this.payers.find(k => k.expenseId === expense.id);
        this.payee = this.payees.find(k => k.expenseId === expense.id && k.payeeId === this.userId);
        // console.log(JSON.stringify(this.payee));
        if (this.payee === undefined) {
          // tslint:disable-next-line: max-line-length
          this.payments.push(new Payment(expense.id, expense.description, this.payer.payerId, "You", 0, "", this.payer.amountPaid, this.payer.amountPaid, expense.dateTime));
        } else {
          // tslint:disable-next-line: max-line-length
          this.payments.push(new Payment(expense.id, expense.description, this.payer.payerId, this.payer.user.name, this.payee.payeeId, "You", this.payer.amountPaid, this.payee.payeeShare, expense.dateTime));
        }
      }
    }
  }
  onSelect(checked: boolean, id: number) {
    if (checked === true) {
      if (id === this.userId) {
        this.members.push(this.currentUser);
      } else {
        this.members.push(this.friends.find(k => k.id === id));
      }
    } else {
      // delete
      const x = this.members.find(k => k.id === id);
      this.members = this.members.filter(k => k !== x);
    }
    console.log(JSON.stringify(this.members));
  }

  async onSubmit(form: NgForm) {
    console.log("Adding new group!");
    console.log(this.group);
    await this.dataService.addGroup(this.group).then(
      k => {
        this.group = k;
      }
    );
    const groupMemberMapping = new GroupMemberMapping();
    groupMemberMapping.groupId = this.group.id;
    for (const x of this.members) {
      groupMemberMapping.memberId = x.id;
      await this.dataService.addGroupMemberMapping(groupMemberMapping);
    }
    this.router.navigate(['groups'], { state: { msg: 'Group added.'}});
  }
  async onDelete() {
    if (confirm('Are you sure you want to delete this group and all its expenses?')) {
      // tslint:disable-next-line: max-line-length
      this.dataService.addActivity(new Activity(this.userId, this.currentUser.name + ' deletd ' + this.group.name + ' group.', new Date(Date.now())));
      await this.dataService.deleteGroup(this.groupId);
      this.router.navigate(['groups'], { state: { msg: 'Group deleted.'}});
    }
  }
}
