import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Expense } from '../models/expense';
import { Payer } from '../models/payer';
import { Payee } from '../models/payee';
import { Settlement } from '../models/settlement';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  expenses: Expense[];
  payers: Payer[];
  payees: Payee[];
  settlements: Settlement[];
  userId: number;
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
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    // this.expenses = this.route.snapshot.data.resolvedData.expenses;
    const x = this.route.snapshot.data.resolvedData;
    this.expenses = x.expenses;
    this.payers = x.payers;
    this.payees = x.payees;
    this.settlements = x.settlements;
    this.userId = 1;
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
      const y = this.payees.filter(k => k.expenseId === owed.expenseId);
      for (const x of y) {
        this.AllOwedTab.push(x.user.name + ' owes you Rs.' + x.payeeShare);
        const temp = this.payments.find(k => +k.from === +this.userId && +k.to === +x.user.id);
        console.log(x.user.id + '|' + this.userId);
        console.log(JSON.stringify(this.payments));
        if (temp !== null && temp !== undefined) {
          temp.amount = Math.abs(temp.amount) - (this.expenses.find(k => k.id === x.expenseId).total - owed.payerShare);
        } else {
          this.payments.push(new Payment('', this.userId, 'You', x.user.id, x.user.name, Math.abs(x.payeeShare) * -1, 0, new Date()));
        }

      }
    }

    for (const owes of owesT) {
      const y = this.payers.filter(k => k.expenseId === owes.expenseId);
      for (const x of y) {
        this.AllOwesTab.push('You owe ' + x.user.name + ' Rs.' + owes.payeeShare);
        const temp = this.payments.find(k => +k.from === +this.userId && +k.to === +x.user.id);
        if (temp != null) {
          temp.amount = temp.amount + owes.payeeShare;
        } else {
          this.payments.push(new Payment('', this.userId, 'You', x.user.id, x.user.name, owes.payeeShare, 0, new Date()));
        }
        // this.payments.push(new Payment(this.userId, 'You', x.user.id, x.user.name, owes.payeeShare));
      }
    }
    for (const pay of this.payments) {
      console.log(pay.amount);
      if (pay.amount < 0) {
        this.owedTab.push(pay.toName + ' owes You Rs. ' + pay.amount * -1);
        this.totalOwed += pay.amount;
      } else if (pay.amount > 0) {
        this.owesTab.push('You owe ' + pay.toName + ' Rs. ' + pay.amount);
        this.totalOwes += pay.amount;
      }
    }
    this.totalOwed *= -1;
    this.grandTotal = this.totalOwed - this.totalOwes;
    if (this.grandTotal > 0) {
      this.sign = '+';
    } else {
      this.sign = '';
    }
  }

}
