import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateTokenService {

  url = environment.serviceUrl
  constructor(
    private http: HttpClient
  ) { }

  public sendPaymentInfoToBackend(payload) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    }); 
    return this.http.post<any>( this.url + "charge", payload, {'headers': headers});
  }

  /*public sendPaymentConfirmation(payload) {
    // url : this.sendPaymentConfirmation.requestObjectpayment
  return this.http.patch<any>("http://localhost:9090/v1/cart/"+CreateTokenService.arguments(this.sendPaymentConfirmation[2].toString), payload);
}*/
}
