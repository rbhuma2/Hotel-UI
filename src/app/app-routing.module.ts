import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookATableComponent } from './pages/book-atable/book-atable.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { FoodMenuComponent } from './pages/food-menu/food-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { FailureComponent } from './pages/failure/failure.component';
import { AvailableOrdersComponent } from './pages/available-orders/available-orders.component';

// { path: '', redirectTo: 'main', pathMatch: 'full' },
// { path: '**', redirectTo: 'main' },
const routes: Routes = [
  { path: 'menu', component: FoodMenuComponent },
  {
    path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'reservation', component: BookATableComponent },
      { path: 'login', component: LoginComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'failure', component: FailureComponent },
      { path: 'orders', component: AvailableOrdersComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
