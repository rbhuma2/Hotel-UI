import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less']
})
export class ConfirmationComponent implements OnInit {

  constructor(   private _Router: Router) { }

  ngOnInit(): void {
  }

  redirectToMenu(){
    this._Router.navigate(['/menu']);
  }

}
