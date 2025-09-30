import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentResponse } from 'src/app/shared/models/orders/paymentResponse';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit {
  paymentResponse?: PaymentResponse;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.paymentResponse = params as PaymentResponse
      }
    })
  }

  ngOnInit(): void {
  }
}
