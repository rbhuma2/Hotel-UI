import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.less']
})
export class MenusComponent implements OnInit {

  isAdmin: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isAdmin  = Boolean(JSON.parse(sessionStorage.getItem("isAdmin")));
  }

}
