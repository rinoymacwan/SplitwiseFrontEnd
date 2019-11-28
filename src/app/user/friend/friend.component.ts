import { Component, OnInit } from '@angular/core';
import { Expense } from '../../shared/models/expense';
import { Payer } from '../../shared/models/payer';
import { Payee } from '../../shared/models/payee';
import { Settlement } from '../../shared/models/settlement';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from '../../shared/models/payment';
import { User } from '../../shared/models/user';
import { DataService } from '../../shared/services/data.service';
import { Activity } from '../../shared/models/activity';
import { NgForm } from '@angular/forms';
import { SignalRService } from 'src/app/shared/services/signal-r.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  expenses: Expense[];
  isNew: boolean;
  payers: Payer[];
  payees: Payee[];
  settlements: Settlement[];
  friendId: string;
  friend: User;
  owesTab: string[];
  owedTab: string[];
  AllOwesTab: string[];
  AllOwedTab: string[];
  payments: Payment[];
  fixedPayments: Payment[];
  totalOwes: number;
  totalOwed: number;
  grandTotal: number;
  sign: string;
  expense: Expense;
  currentUser: User;
  email: string;
  doesntExist: boolean;
  removeList: User[];
  listOfUsers: string[];
  newFriend: User;
  // tslint:disable-next-line: max-line-length
  constructor(private signalRService: SignalRService, private route: ActivatedRoute, private router: Router, private dataService: DataService) {
    this.friendId = this.route.snapshot.paramMap.get('id');
    this.email = '';
    this.listOfUsers = [];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.friendId === '0') {
      this.isNew = true;
      this.doesntExist = false;
      this.newFriend = new User();
    } else {
      this.isNew = false;
      this.removeList = [];
      const x = this.route.snapshot.data.resolvedData;
      this.expenses = x.expenses;
      this.payers = x.payers;
      this.payees = x.payees;
      this.settlements = x.settlements;
      this.friend = x.friend;
      this.settlements = this.settlements.filter(k => k.payeeId === this.friendId || k.payerId === this.friendId);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.owedTab = [];
      this.owesTab = [];
      this.AllOwedTab = [];
      this.AllOwesTab = [];
      this.payments = [];
      this.fixedPayments = [];
      this.totalOwed = 0;
      this.totalOwes = 0;
      this.grandTotal = 0;
      this.sign = '';
    }
  }

  ngOnInit() {
    if (this.isNew === false) {
      const owesT = this.payees.filter(k => k.payeeId === this.currentUser.id);
      const owedT = this.payers.filter(k => k.payerId === this.currentUser.id);

      for (const owed of owedT) {
        const y = this.payees.filter(k => k.expenseId === owed.expenseId && k.payeeId === this.friendId);
        for (const x of y) {
          this.expense = this.expenses.find(k => k.id === x.expenseId);
          // tslint:disable-next-line: max-line-length
          this.AllOwedTab.push(this.expense.description + ' | You paid Rs. ' + owed.amountPaid + ' | You lent ' + x.user.name + ' Rs.' + x.payeeShare);
          // tslint:disable-next-line: max-line-length
          this.payments.push(new Payment(this.expense.id, this.expense.description, this.currentUser.id, 'You', this.friendId, x.user.name, owed.amountPaid, x.payeeShare, this.expense.dateTime));
          this.totalOwed += x.payeeShare;
          // console.log(x.payeeShare);
        }
      }

      for (const owes of owesT) {
        const y = this.payers.filter(k => k.expenseId === owes.expenseId && k.payerId === this.friendId);
        for (const x of y) {
          this.expense = this.expenses.find(k => k.id === x.expenseId);
          // tslint:disable-next-line: max-line-length
          this.AllOwesTab.push(this.expense.description + ' | ' + x.user.name + ' paid ' + x.amountPaid + ' | ' + x.user.name + ' lent you ' + owes.payeeShare);
          // tslint:disable-next-line: max-line-length
          this.payments.push(new Payment(this.expense.id, this.expense.description, x.user.id, x.user.name, this.currentUser.id, 'You', x.amountPaid, owes.payeeShare, this.expense.dateTime));
          this.totalOwes += owes.payeeShare;
          // console.log(owes.payeeShare);
        }
      }
      this.payments.sort((a: Payment, b: Payment) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();

      });
    } else {
      // console.log('new');
    }
    this.grandTotal = this.totalOwed - this.totalOwes;
    for (const z of this.settlements) {

      if (z.payerId === this.currentUser.id) {
        this.grandTotal += z.amount;
      } else {
        this.grandTotal -= z.amount;
      }
    }

  }

  async deleteSettlement(id: number) {
    if (confirm('Are you sure you want to delete this settlement?')) {
      // tslint:disable-next-line: max-line-length
      this.dataService.addActivity(new Activity(this.currentUser.id, this.currentUser.name + ' deleted a settlement with ' + this.friend.name, new Date(Date.now())));
      await this.dataService.deleteSettlement(id);

      const str = `${this.currentUser.name} removed a settlement with you.` ;
      this.listOfUsers.push(this.friend.id);
      this.signalRService.SendMessages(str, this.listOfUsers);
      // problem with routing
      this.router.navigate(['friend', this.friendId], { state: { msg: 'Settlement deleted.' } });
    }
  }
  async deleteFriend() {
    if (confirm('Are you sure you want to remove ' + this.friend.name + ' as a friend?')) {
      // tslint:disable-next-line: max-line-length
      this.dataService.addActivity(new Activity(this.currentUser.id, 'You removed ' + this.friend.name + ' as a friend.', new Date(Date.now())));
      this.removeList.push(this.currentUser);
      this.removeList.push(this.friend);
      await this.dataService.deleteFriend(this.removeList);

      const str = `${this.currentUser.name} removed you as a friend` ;
      this.listOfUsers.push(this.friend.id);
      this.signalRService.SendMessages(str, this.listOfUsers);

      // problem with routing
      this.router.navigate(['friends'], { state: { msg: 'Friend removed.' } });
    }
  }
  async addFriend(myform: NgForm) {
    console.log('add Friend');
    const x = await this.dataService.addFriend(this.email, this.currentUser.id).then(
      k => {
        console.log(k);
        if (k.userName !== null) {
          this.doesntExist = false;
          this.newFriend = k;
          this.router.navigate(['friends'], { state: { msg: 'friend added.' } });

        } else {
          this.doesntExist = true;
        }
      }
    );
    const str = `${this.currentUser.name} added you as a friend` ;
    this.listOfUsers.push(this.newFriend.id);
    this.signalRService.SendMessages(str, this.listOfUsers);
  }

}
