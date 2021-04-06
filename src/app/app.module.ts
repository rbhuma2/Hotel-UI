import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './pages/header/header.component';
import { MenusComponent } from './pages/menus/menus.component';
import { BookATableComponent } from './pages/book-atable/book-atable.component';
import { FoodMenuComponent } from './pages/food-menu/food-menu.component';
import { LoginComponent } from './pages/login/login.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PaymentComponent } from './pages/payment/payment.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxStripeModule } from 'ngx-stripe';
import { CreateTokenComponent } from './pages/create-token/create-token.component';
import { PaymentRequestButtonComponent } from './pages/payment-request-button/payment-request-button.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    HeaderComponent,
    MenusComponent,
    BookATableComponent,
    FoodMenuComponent,
    LoginComponent,
    PaymentComponent,
    ConfirmationComponent,
    FeedbackComponent,
    CreateTokenComponent,
    PaymentRequestButtonComponent,

  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule,NgxSpinnerModule,ToastrModule.forRoot(),
    IvyCarouselModule,
    NgxStripeModule.forRoot('pk_test_51I0tBLHjDycGB3bI5KY701EORzL4a4Fwzu7LfhhlzvfDgA2Ifo1rYhutDHaFNvR6i0CZqp0AplSYBQcHSTwXM0CQ00kkW6q5V1'),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class AppModule { }
