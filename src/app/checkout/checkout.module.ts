import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutDeliveryComponent } from './pages/checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './pages/checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './pages/checkout-payment/checkout-payment.component';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { CheckoutNavigateComponent } from './pages/checkout-navigate/checkout-navigate.component';
import { CheckoutFailedComponent } from './pages/checkout-failed/checkout-failed.component';
import { CheckoutInfoComponent } from './pages/checkout-info/checkout-info.component';
import { CheckoutComponent } from './pages/checkout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutInfoComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    CheckoutSuccessComponent,
    CheckoutNavigateComponent,
    CheckoutFailedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
