import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertmessageService } from 'src/app/alertmessage.service';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-book-atable',
  templateUrl: './book-atable.component.html',
  styleUrls: ['./book-atable.component.less']
})
export class BookATableComponent implements OnInit {

  @ViewChild('ReservationForm') form: any;
  loading = false
  errorData = {
    show: true,
    message: ''
  }

  constructor(
    private _ApiService: ApiService,
    public _AlertmessageService: AlertmessageService,
    private _Router : Router,
  ) { }

  ngOnInit(): void {
    this._AlertmessageService.errorMessageShow('');
  }

  onBook(formData) {
    this.errorData.show = false
    this.loading = false
    console.log(formData)
    this._ApiService.post('bookTable', formData).subscribe(response => {
      this.loading = true
      this.form.reset()
      this._Router.navigate(['/'])
      console.log(response)
      this._AlertmessageService.successAlert('Booking successful')
    }, error => {
      this._AlertmessageService.errorMessageShow(error);
    })
  }

}
