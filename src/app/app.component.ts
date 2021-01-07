import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less',
]
})
export class AppComponent {
  title = 'restaurant';
  constructor(private spinner: NgxSpinnerService){}
  activateSpinner(){
    this.spinner.show();
  }
  deactivateSpinner(){
    this.spinner.hide();
  }
}
