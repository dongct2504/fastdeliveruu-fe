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

  totalPrice = 0;

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
      this.calculateTotalPrice();
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
        this.calculateTotalPrice();
      });
    }
  }

  decrementCartItem(menuItemId: string) {
    if (this.customerCart) {
      const cartItemIndex = this.customerCart.findIndex(c => c.menuItemId === menuItemId);

      if (this.customerCart[cartItemIndex].quantity <= 1) {
        this.customerCartService.deleteCartItem(menuItemId).subscribe(() => {
          this.customerCart = this.customerCart!.filter(item => item.menuItemId !== menuItemId);
          this.calculateTotalPrice();
        });
      } else {
        const setCartItemRequest: SetCartItemRequest = {
          menuItemId: menuItemId,
          quantity: -1
        };
        this.customerCartService.updateCartItem(setCartItemRequest).subscribe(() => {
          this.customerCart![cartItemIndex].quantity--;
          this.calculateTotalPrice();
        });
      }
    }
  }

  deleteCartItem(menuItemId: string) {
    this.customerCartService.deleteCartItem(menuItemId).subscribe(() => {
      if (this.customerCart) {
        this.customerCart = this.customerCart.filter(item => item.menuItemId !== menuItemId);
        this.calculateTotalPrice();
      }
    });
  }

  private calculateTotalPrice() {
    if (this.customerCart) {
      this.totalPrice = this.customerCart.reduce((sum, item) =>
        (item.menuItemDto.discountPrice * item.quantity) + sum, 0);
    }
  }
}
