import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { Payer } from '../models/payer';
import { Payee } from '../models/payee';
import { Settlement } from '../models/settlement';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  expenses: Expense[];
  payers: Payer[];
  payees: Payee[];
  settlements: Settlement[];
  userId: number;
  friendId: number;
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
  constructor(private route: ActivatedRoute, private router: Router) {
    const x = this.route.snapshot.data.resolvedData;
    this.expenses = x.expenses;
    this.payers = x.payers;
    this.payees = x.payees;
    this.settlements = x.settlements;
    this.userId = 1;
    this.friendId = +this.route.snapshot.paramMap.get('id');
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

  ngOnInit() {
    const owesT = this.payees.filter(k => k.payeeId === this.userId);
    const owedT = this.payers.filter(k => k.payerId === this.userId);

    for (const owed of owedT) {
      const y = this.payees.filter(k => k.expenseId === owed.expenseId && k.payeeId === this.friendId);
      for (const x of y) {
        this.expense = this.expenses.find(k => k.id === x.expenseId);
        // tslint:disable-next-line: max-line-length
        this.AllOwedTab.push(this.expense.description + ' | You paid Rs. ' + owed.payerShare + ' | You lent ' + x.user.name + ' Rs.' + x.payeeShare);
        // tslint:disable-next-line: max-line-length
        this.payments.push(new Payment(this.expense.description, this.userId, 'You', this.friendId, x.user.name, owed.payerShare, x.payeeShare, this.expense.dateTime));
      }
    }

    for (const owes of owesT) {
      const y = this.payers.filter(k => k.expenseId === owes.expenseId && k.payerId === this.friendId);
      for (const x of y) {
        this.expense = this.expenses.find(k => k.id === x.expenseId);
        // tslint:disable-next-line: max-line-length
        this.AllOwesTab.push( this.expense.description + ' | ' + x.user.name + ' paid ' + x.amountPaid + ' | ' + x.user.name + ' lent you ' + owes.payeeShare);
        // tslint:disable-next-line: max-line-length
        this.payments.push(new Payment(this.expense.description, x.user.id, x.user.name, this.userId, 'You', x.amountPaid, owes.payeeShare, this.expense.dateTime));
      }
    }
    this.payments.sort((a: Payment, b: Payment) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();

  });
  }

}
