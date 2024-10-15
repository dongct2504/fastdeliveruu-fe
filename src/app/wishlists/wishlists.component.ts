import { Component, OnInit } from '@angular/core';
import { WishListDto } from '../shared/models/wishLists/wishListDto';
import { WishlistsService } from './wishlists.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { WishListParams } from '../shared/models/wishLists/wishListParams';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.css']
})
export class WishlistsComponent implements OnInit {
  wishLists?: WishListDto[];

  faTrash = faTrash;

  wishListParams = new WishListParams();
  totalRecords = 0;

  constructor(private wishListsService: WishlistsService) {
  }

  ngOnInit(): void {
    this.getWishLists();
  }

  getWishLists() {
    this.wishListsService.getWishLists().subscribe(wishLists => {
      this.wishLists = wishLists.items;
      this.totalRecords = wishLists.totalRecords;
    });
  }

  deleteCartItem(id: string) {
    this.wishListsService.deleteWishListItem(id).subscribe(() => {
      if (this.wishLists) {
        this.wishLists = this.wishLists.filter(item => item.id !== id);
      }
    });
  }

  onPageChanged(event: any) {
    if (this.wishListParams.pageNumber !== event) {
      this.wishListParams.pageNumber = event;
      this.getWishLists();
    }
  }

  onSearchSubmit(event: any) {
    this.wishListParams.search = event;
    this.wishListParams.pageNumber = 1;
    this.getWishLists();
  }
}
