import { Component, OnInit } from '@angular/core';
import { ShoppingCartDto } from '../shared/models/shoppingCarts/shoppingCartDto';
import { CustomerCartService } from './customer-cart.service';
import { SetCartItemRequest } from '../shared/models/shoppingCarts/setCartItemRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {
  customerCart?: ShoppingCartDto[];

  constructor(private customerCartService: CustomerCartService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getCustomerCart();
  }

  getCustomerCart() {
    this.customerCartService.getCustomerCart().subscribe(customerCart => {
      this.customerCart = customerCart;
    });
  }

  updateCartItem(menuItemId: string, quantity: number) {
    const setCartItemRequest: SetCartItemRequest = {
      menuItemId: menuItemId,
      quantity: quantity
    };

    this.customerCartService.setCartItem(setCartItemRequest).subscribe(() => {
    });
  }

  deleteCartItem(menuItemId: string) {
    this.customerCartService.deleteCartItem(menuItemId).subscribe(() => {
      if (this.customerCart) {
        this.customerCart = this.customerCart.filter(c => c.menuItemId !== menuItemId);

        this.toastr.info('successfully deleted!');
      }
    });
  }
}
