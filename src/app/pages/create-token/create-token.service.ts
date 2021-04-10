import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateTokenService {

  constructor(
    private http: HttpClient
  ) { }

  public sendPaymentInfoToBackend(payload) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    }); 
    return this.http.post<any>("http://localhost:9090/v1/charge", payload, {'headers': headers});
  }

  /*public sendPaymentConfirmation(payload) {
    // url : this.sendPaymentConfirmation.requestObjectpayment
  return this.http.patch<any>("http://localhost:9090/v1/cart/"+CreateTokenService.arguments(this.sendPaymentConfirmation[2].toString), payload);
}*/
}
