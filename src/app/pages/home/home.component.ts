import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertmessageService } from 'src/app/alertmessage.service';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router,
    public _AlertmessageService: AlertmessageService) { }

  ngOnInit(): void {
    this._AlertmessageService.errorMessageShow('');
  }

  showModal():void {
    $("#myModal").modal('show');
  }
  sendModal(): void {
    //do something here
    this.hideModal();
  }
  hideModal():void {
    document.getElementById('close-modal').click();
  }
  take(){
     this.route.navigate(['menu'])
  }

}
