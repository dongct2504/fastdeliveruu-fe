import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { WishListDto } from 'src/app/shared/models/wishLists/wishListDto';
import { WishlistsService } from '../services/wishlists.service';
import { PageSizeConstants } from 'src/app/shared/common/pageSizeConstants';
import { WishListParams } from 'src/app/shared/models/wishLists/wishListParams';

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
    this.wishListParams.pageSize = PageSizeConstants.pageSize24;
  }

  ngOnInit(): void {
    this.getWishLists();
  }

  getWishLists() {
    this.wishListsService.getWishLists().subscribe(pagedList => {
      this.wishLists = pagedList.items;
      this.wishListParams.pageNumber = pagedList.pageNumber;
      this.totalRecords = pagedList.totalRecords;
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
