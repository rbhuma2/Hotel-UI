import { Component, OnInit } from '@angular/core';
import { AlertmessageService } from 'src/app/alertmessage.service';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.less']
})
export class FeedbackComponent implements OnInit {

  errorData = {
    show: true,
    message: ''
  }
  constructor(
    private _ApiService: ApiService,
    public _AlertmessageService: AlertmessageService,
    private _Router: Router,
  ) { }

  ngOnInit(): void {
    // const signUpButton = document.getElementById('signUp');
    // const signInButton = document.getElementById('signIn');
    // const container = document.getElementById('container2');
    // signUpButton.addEventListener('click', () => {
    //   container.classList.add("right-panel-active");
    // });
    this._AlertmessageService.errorMessageShow('');
    // signInButton.addEventListener('onload', () => {
    //   container.classList.remove("right-panel-active");
    // });
  }

  onBook(formData) {
    console.log(formData)
    this._ApiService.post('feedback', formData).subscribe(response => {
      this._AlertmessageService.successAlert('Feedback Submitted! Thanks for your valuable time.')
      this._Router.navigate(['/'])
    }, error => {
      // console.error(error)
      this._AlertmessageService.errorMessageShow(error);
      //this._AlertmessageService.errorMessageShow('Something went wrong!')
    })
  }

}
