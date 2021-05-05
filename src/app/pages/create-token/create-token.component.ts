import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { CreateTokenService } from './create-token.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.less']
})
export class CreateTokenComponent implements OnInit {
  amount : number;
  identifier : any;
  isProcessed : boolean;
  transaction_id : any;
  totalAmount : any;
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#1B1717',
        color: '#1B1717',
        fontWeight: '500',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: 'black'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder, 
    private stripeService: StripeService,
    private createTokenService: CreateTokenService,
    private _ApiService: ApiService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    
    localStorage.removeItem('checkout')
    this.setAmount();
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  private setAmount (){
    this._ApiService.cart('cart').subscribe(res=>{
      this.amount = res.totalAmount;
      this.identifier = res.identifier;
     //console.log(res);
    })    
    
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    const email = localStorage.getItem('email')
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          /** Stripe generates a token id from the checkout */
          let requestObject = {
            "amount"          : this.amount,
            "stripeToken"     : result.token.id,
            "id"              : this.identifier,
            "email"           : email
          }

          /** Sending the generated token and price to the backend charges API to complete the transaction */
          this.createTokenService.sendPaymentInfoToBackend(requestObject).subscribe((response) => {
            console.log(response.status);
            /** Redirecting user back to confirmation page */
            this._Router.navigate(['/confirmation']);
          },  (_error) => {
            this._Router.navigate(['/failure']);
          }
        );
       } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
    }
}