import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaymentMethodsEnum } from 'src/app/shared/enums/payment-methods.enum';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;

  paymentMethodsEnum = PaymentMethodsEnum;

  constructor() {
  }
}
