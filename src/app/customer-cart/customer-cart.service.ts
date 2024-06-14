import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ShoppingCartDto } from '../shared/models/shoppingCarts/shoppingCartDto';
import { SetCartItemRequest } from '../shared/models/shoppingCarts/setCartItemRequest';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerCartService {
  private apiUrl = environment.apiUrl;

  private totalQuantitySource = new BehaviorSubject<number>(this.getTotalQuantity());
  totalQuantity$ = this.totalQuantitySource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  public getCustomerCart() {
    return this.httpClient.get<ShoppingCartDto[]>(`${this.apiUrl}/carts`);
  }

  public updateCartItem(updateCartItemRequest: SetCartItemRequest) {
    return this.httpClient.post<number>(`${this.apiUrl}/carts`, updateCartItemRequest).pipe(
      map(totalQuantity => this.setTotalQuantity(totalQuantity))
    );
  }

  public deleteCartItem(menuItemId: string) {
    return this.httpClient.delete<number>(`${this.apiUrl}/carts/${menuItemId}`).pipe(
      map(totalQuantity => this.setTotalQuantity(totalQuantity))
    );
  }

  public deleteCustomerCart() {
    return this.httpClient.delete(`${this.apiUrl}/carts`).pipe(
      map(() => this.removeTotalQuantity())
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
    localStorage.removeItem('totalQuantity');
    this.totalQuantitySource.next(0);
  }

  private getTotalQuantity() {
    return JSON.parse(localStorage.getItem('totalQuantity') || '0');
  }

  private setTotalQuantity(quantity: number) {
    localStorage.setItem('totalQuantity', JSON.stringify(quantity));
    this.totalQuantitySource.next(quantity);
  }
}
