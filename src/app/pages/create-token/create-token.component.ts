import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { CreateTokenService } from './create-token.service';

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.less']
})
export class CreateTokenComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private stripeService: StripeService,
    private createTokenService: CreateTokenService
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          /** Stripe generates a token id from the checkout */
          let requestObject = {
            "transactionId"   : "ch_1IdH0dHjDycGB3bIQDuXT6bY",
            "amount"          : 1000,
            "links"           : [],
            "token"           : result.token,
            "tokenId"         : result.token.id
          }

          /** Sending the generated token and price to the backend charges API to complete the transaction */
          this.createTokenService.sendPaymentInfoToBackend(requestObject).subscribe(response => {
            console.log("Successfully sent to server");
            console.log(response);
          });
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}