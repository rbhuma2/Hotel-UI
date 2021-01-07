import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AlertmessageService {
  globalErrorMessage: String = '';
  constructor(private toasterMessage: ToastrService) { }
  successAlert(message: any){
    this.toasterMessage.success(message, '', {
      timeOut: 3000,
      positionClass: 'toast-top-center'
    });
  }
  errorAlert(message: any){
    this.toasterMessage.error(message, '', {
      timeOut: 3000,
      positionClass: 'toast-top-center'
    });
  }
  errorMessageShow(error:any){
    if(error && error.error.errors[0].message){
      this.globalErrorMessage = error.error.errors[0].message;
      //this.errorAlert(error.errors[0].message)
    }else {
      this.globalErrorMessage = '';
    }
  }

}
