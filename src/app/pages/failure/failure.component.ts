import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.less']
})
export class FailureComponent implements OnInit {

  constructor(private _Router: Router) { }

  ngOnInit(): void {
  }

  redirectToPayment(){
    this._Router.navigate(['/payment']);
  }

}
