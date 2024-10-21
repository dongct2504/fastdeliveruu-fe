import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, map, of } from 'rxjs';
import { WishListDto } from 'src/app/shared/models/wishLists/wishListDto';
import { PagedList } from 'src/app/shared/models/PagedList';
import { SetWishListItemRequest } from 'src/app/shared/models/wishLists/setWishListItemRequest';

@Injectable({
  providedIn: 'root'
})
export class WishlistsService {
  private apiUrl = environment.apiUrl;

  private totalQuantitySource = new BehaviorSubject<number>(this.getTotalQuantity());
  totalQuantity$ = this.totalQuantitySource.asObservable();

  private currentWishlistItems: WishListDto[] = [];

  constructor(private httpClient: HttpClient) { }

  // public getWishLists() {
  //   return this.httpClient.get<PagedList<WishListDto>>(`${this.apiUrl}/wishlists`);
  // }

  public getWishLists() {
    return this.httpClient.get<PagedList<WishListDto>>(`${this.apiUrl}/wishlists`).pipe(
      map(pagedList => {
        this.currentWishlistItems = pagedList.items;
        return pagedList;
      })
    );
  }

  // public updateWishListItem(updateWishListItemRequest: SetWishListItemRequest) {
  //   return this.httpClient.post(`${this.apiUrl}/wishlists`, updateWishListItemRequest);
  // }

  public updateWishListItem(updateWishListItemRequest: SetWishListItemRequest) {
    let itemAlreadyExists: boolean = false;

    itemAlreadyExists = this.currentWishlistItems.some(item =>
      item.menuItemId === updateWishListItemRequest.menuItemId ||
      item.menuVariantId === updateWishListItemRequest.menuVariantId);

    if (itemAlreadyExists) {
      return of(void 0);
    }

    return this.httpClient.post(`${this.apiUrl}/wishlists`, updateWishListItemRequest).pipe(
      map(() => {
        this.plusTotalQuantity();
        this.getWishLists().subscribe();
      })
    );
  }

  public deleteWishListItem(wishListItem: string) {
    return this.httpClient.delete(`${this.apiUrl}/wishlists/${wishListItem}`).pipe(
      map(() => {
        this.minusTotalQuantity();
        this.getWishLists().subscribe();
      })
    );
  }

  public deleteWishLists() {
    return this.httpClient.delete(`${this.apiUrl}/wishlists`).pipe(
      map(() => {
        this.currentWishlistItems = [];
        this.removeTotalQuantity();
      })
    );
  }

  public loadTotalQuantity() {
    this.getWishLists().subscribe(wishlist => {
      const totalQuantity = wishlist.items.length;
      this.setTotalQuantity(totalQuantity);
    });
  }

  private plusTotalQuantity() {
    const quantity = this.getTotalQuantity() + 1;
    this.setTotalQuantity(quantity);
  }

  private minusTotalQuantity() {
    let quantity = this.getTotalQuantity() - 1;
    if (quantity < 0) {
      quantity = 0;
    }
    this.setTotalQuantity(quantity);
  }

  private getTotalQuantity(): number {
    return JSON.parse(localStorage.getItem('wishlist-totalQuantity') || '0');
  }

  private setTotalQuantity(quantity: number) {
    localStorage.setItem('wishlist-totalQuantity', JSON.stringify(quantity));
    this.totalQuantitySource.next(quantity);
  }

  public removeTotalQuantity() {
    localStorage.removeItem('wishlist-totalQuantity');
    this.totalQuantitySource.next(0);
  }
}
