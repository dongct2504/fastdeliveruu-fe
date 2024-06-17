import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutNavigateComponent } from './checkout-navigate/checkout-navigate.component';
import { CheckoutInfoComponent } from './checkout-info/checkout-info.component';
import { CheckoutFailedComponent } from './checkout-failed/checkout-failed.component';

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
