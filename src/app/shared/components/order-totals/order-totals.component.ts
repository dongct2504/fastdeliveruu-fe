import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartTotal } from '../../models/shoppingCarts/cartTotal';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {
  totalPrice$?: Observable<CartTotal | null>;

  constructor(private customerCartService: CustomerCartService) {
  }

  ngOnInit(): void {
    this.totalPrice$ = this.customerCartService.totalPrice$;
  }
}
