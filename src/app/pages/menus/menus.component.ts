import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.less']
})
export class MenusComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.isAdmin  = Boolean(JSON.parse(sessionStorage.getItem("isAdmin")));
    console.log(this.isAdmin)
  }

  isLogin(){
    if(localStorage.getItem("name") !== null){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    sessionStorage.removeItem('isAdmin')
    this.router.navigate(['/home'])
    window.location.reload()
  }

}
