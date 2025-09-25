import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../../services/menu-items.service';
import { MenuItemDetailDto } from 'src/app/shared/models/menuItems/menuItemDetailDto';
import { ActivatedRoute, Router } from '@angular/router';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';
import { SetCartItemRequest } from 'src/app/shared/models/shoppingCarts/setCartItemRequest';
import { ToastrService } from 'ngx-toastr';
import { MenuVariantDto } from 'src/app/shared/models/menuItems/menuVariantDto';
import { SetWishListItemRequest } from 'src/app/shared/models/wishLists/setWishListItemRequest';
import { WishlistsService } from 'src/app/wishlists/services/wishlists.service';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.css']
})
export class MenuItemDetailsComponent implements OnInit {
  menuItem?: MenuItemDetailDto;
  selectedVariant?: MenuVariantDto | null = null;
  quantity = 1;

  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;

  constructor(private menuItemsService: MenuItemsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private customerCartService: CustomerCartService,
    private wishListsService: WishlistsService) {
  }

  ngOnInit(): void {
    this.getMenuItem();
  }

  addToCart() {
    if (this.menuItem) {
      const setCartItemRequest: SetCartItemRequest = {
        menuItemId: this.menuItem.id,
        menuVariantId: this.selectedVariant?.id,
        quantity: this.quantity,
      };
      this.customerCartService.updateCartItem(setCartItemRequest).subscribe(() => {
        this.toastr.success('Đã thêm vào giỏ hàng!');
        this.router.navigate(['/carts']);
      });
    }
  }

  addToWishList() {
    if (this.menuItem) {
      const setWishListItemRequest: SetWishListItemRequest = {
        menuItemId: this.menuItem.id,
        menuVariantId: this.selectedVariant?.id
      };
      this.wishListsService.updateWishListItem(setWishListItemRequest).subscribe(() => {
        this.toastr.success('Đã thêm vào yêu thích!');
        this.router.navigate(['/wishlists']);
      });
    }
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  selectVariant(variant: MenuVariantDto) {
    if (this.selectedVariant?.id === variant.id) {
      this.selectedVariant = null;
    } else {
      this.selectedVariant = variant;
    }
  }

  private getMenuItem() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.menuItemsService.getMenuItem(id).subscribe(menuItem => {
      this.menuItem = menuItem;
    })
  }
}