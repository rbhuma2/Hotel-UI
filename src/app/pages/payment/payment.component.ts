import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less']
})
export class PaymentComponent implements OnInit {

  constructor(
    private _Router: Router
  ) { }

  ngOnInit(): void {
  }

  onPayment() {
    this._Router.navigate(['/confirmation'])
  }

}
