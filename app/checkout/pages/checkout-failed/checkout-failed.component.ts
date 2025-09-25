import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentResponse } from 'src/app/shared/models/orders/paymentResponse';

@Component({
  selector: 'app-checkout-failed',
  templateUrl: './checkout-failed.component.html',
  styleUrls: ['./checkout-failed.component.css']
})
export class CheckoutFailedComponent implements OnInit {
  paymentResponse?: PaymentResponse;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.paymentResponse = params as PaymentResponse;
      }
    });
  }
}
