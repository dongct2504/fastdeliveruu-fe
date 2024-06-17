import { Component, OnInit } from '@angular/core';
import { ShoppingCartDto } from '../shared/models/shoppingCarts/shoppingCartDto';
import { CustomerCartService } from './customer-cart.service';
import { SetCartItemRequest } from '../shared/models/shoppingCarts/setCartItemRequest';
import { faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {
  customerCart?: ShoppingCartDto[];

  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  faTrash = faTrash;

  constructor(private customerCartService: CustomerCartService) {
  }

  ngOnInit(): void {
    this.getCustomerCart();
  }

  getCustomerCart() {
    this.customerCartService.getCustomerCart().subscribe(customerCart => {
      this.customerCart = customerCart;
    });
  }

  incrementCartItem(menuItemId: string) {
    if (this.customerCart) {
      const cartItemIndex = this.customerCart.findIndex(c => c.menuItemId === menuItemId);

      const setCartItemRequest: SetCartItemRequest = {
        menuItemId: menuItemId,
        quantity: 1
      };
      this.customerCartService.updateCartItem(setCartItemRequest).subscribe(() => {
        this.customerCart![cartItemIndex].quantity++;
      });
    }
  }

  decrementCartItem(menuItemId: string) {
    if (this.customerCart) {
      const cartItemIndex = this.customerCart.findIndex(c => c.menuItemId === menuItemId);

      if (this.customerCart[cartItemIndex].quantity <= 1) {
        this.customerCartService.deleteCartItem(menuItemId).subscribe(() => {
          this.customerCart = this.customerCart!.filter(item => item.menuItemId !== menuItemId);
        });
      } else {
        const setCartItemRequest: SetCartItemRequest = {
          menuItemId: menuItemId,
          quantity: -1
        };
        this.customerCartService.updateCartItem(setCartItemRequest).subscribe(() => {
          this.customerCart![cartItemIndex].quantity--;
        });
      }
    }
  }

  deleteCartItem(menuItemId: string) {
    this.customerCartService.deleteCartItem(menuItemId).subscribe(() => {
      if (this.customerCart) {
        this.customerCart = this.customerCart.filter(item => item.menuItemId !== menuItemId);
      }
    });
  }
}
