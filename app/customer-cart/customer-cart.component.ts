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

  incrementCartItem(cartItem: ShoppingCartDto) {
    if (this.customerCart) {
      const cartItemIndex = this.customerCart
        .findIndex(c => c.menuItemId === cartItem.menuItemId &&
          (cartItem.menuVariantId === null || c.menuVariantId === cartItem.menuVariantId));

      const setCartItemRequest: SetCartItemRequest = {
        quantity: 1,
        menuItemId: cartItem.menuItemId,
        menuVariantId: cartItem.menuVariantId
      };
      this.customerCartService.updateCartItem(setCartItemRequest).subscribe(() => {
        this.customerCart![cartItemIndex].quantity++;
      });
    }
  }

  decrementCartItem(cartItem: ShoppingCartDto) {
    if (this.customerCart) {
      const cartItemIndex = this.customerCart
        .findIndex(c => c.menuItemId === cartItem.menuItemId &&
          (cartItem.menuVariantId === null || c.menuVariantId === cartItem.menuVariantId));

      if (this.customerCart[cartItemIndex].quantity <= 1) {
        this.customerCartService.deleteCartItem(cartItem.id).subscribe(() => {
          this.customerCart = this.customerCart!.filter(item => item.id !== cartItem.id);
        });
      } else {
        const setCartItemRequest: SetCartItemRequest = {
          quantity: -1,
          menuItemId: cartItem.menuItemId,
          menuVariantId: cartItem.menuVariantId
        };
        this.customerCartService.updateCartItem(setCartItemRequest).subscribe(() => {
          this.customerCart![cartItemIndex].quantity--;
        });
      }
    }
  }

  deleteCartItem(id: string) {
    this.customerCartService.deleteCartItem(id).subscribe(() => {
      if (this.customerCart) {
        this.customerCart = this.customerCart.filter(item => item.id !== id);
      }
    });
  }
}
