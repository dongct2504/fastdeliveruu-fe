import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { DeliveryMethodDto } from 'src/app/shared/models/orders/deliveryMethodDto';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;

  deliveryMethods?: DeliveryMethodDto[];

  constructor(private checkoutService: CheckoutService, private customerCartService: CustomerCartService) {
  }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe(deliveryMethods => {
      this.deliveryMethods = deliveryMethods;
    });
  }

  setShippingPrice(deliveryMethod: DeliveryMethodDto) {
    this.customerCartService.setShippingPrice(deliveryMethod);
  }
}
