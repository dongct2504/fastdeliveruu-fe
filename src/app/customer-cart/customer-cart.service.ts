import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ShoppingCartDto } from '../shared/models/shoppingCarts/shoppingCartDto';
import { SetCartItemRequest } from '../shared/models/shoppingCarts/setCartItemRequest';
import { BehaviorSubject, map } from 'rxjs';
import { CartTotal } from '../shared/models/shoppingCarts/cartTotal';
import { DeliveryMethodDto } from '../shared/models/orders/deliveryMethodDto';

@Injectable({
  providedIn: 'root'
})
export class CustomerCartService {
  private apiUrl = environment.apiUrl;

  private totalQuantitySource = new BehaviorSubject<number>(this.getTotalQuantity());
  totalQuantity$ = this.totalQuantitySource.asObservable();

  private totalPriceSource = new BehaviorSubject<CartTotal>({ subtotal: 0, shipping: 0, total: 0 });
  totalPrice$ = this.totalPriceSource.asObservable();

  private shipping = 0;

  constructor(private httpClient: HttpClient) {
  }

  public getCustomerCart() {
    return this.httpClient.get<ShoppingCartDto[]>(`${this.apiUrl}/carts`);
  }

  public updateCartItem(updateCartItemRequest: SetCartItemRequest) {
    return this.httpClient.post<number>(`${this.apiUrl}/carts`, updateCartItemRequest).pipe(
      map(totalQuantity => {
        this.setTotalQuantity(totalQuantity);
        this.calculateTotals();
      })
    );
  }

  public deleteCartItem(menuItemId: string) {
    return this.httpClient.delete<number>(`${this.apiUrl}/carts/${menuItemId}`).pipe(
      map(totalQuantity => {
        this.setTotalQuantity(totalQuantity);
        this.calculateTotals();
      })
    );
  }

  public deleteCustomerCart() {
    return this.httpClient.delete(`${this.apiUrl}/carts`).pipe(
      map(() => {
        this.removeTotalQuantity();
        this.resetTotals();
      })
    );
  }

  // Quantity handle methods
  public loadTotalQuantity() {
    this.getCustomerCart().subscribe(customerCart => {
      const totalQuantity = customerCart.reduce((sum, item) => sum + item.quantity, 0);
      this.setTotalQuantity(totalQuantity);
    });
  }

  public removeTotalQuantity() {
    localStorage.removeItem('cart-totalQuantity');
    this.totalQuantitySource.next(0);
  }

  private getTotalQuantity() {
    return JSON.parse(localStorage.getItem('cart-totalQuantity') || '0');
  }

  private setTotalQuantity(quantity: number) {
    localStorage.setItem('cart-totalQuantity', JSON.stringify(quantity));
    this.totalQuantitySource.next(quantity);
  }

  // Total price handle methods
  public calculateTotals() {
    this.getCustomerCart().subscribe(customerCart => {
      const subtotal = customerCart.reduce((sum, item) =>
        sum + (item.menuVariantDto
          ? item.menuVariantDto.discountPrice
          : item.menuItemDto.discountPrice) * item.quantity, 0);
      const shipping = this.shipping;
      const total = subtotal + shipping;

      this.totalPriceSource.next({ subtotal, shipping, total });
    });
  }

  private resetTotals() {
    this.totalPriceSource.next({ subtotal: 0, shipping: 0, total: 0 });
  }

  public setShippingPrice(deliveryMethod: DeliveryMethodDto) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
  }
}
