import { Component, Input } from '@angular/core';
import { MenuItemDto } from '../../models/menuItems/menuItemDto';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetCartItemRequest } from '../../models/shoppingCarts/setCartItemRequest';
import { SetWishListItemRequest } from '../../models/wishLists/setWishListItemRequest';
import { AuthenticateService } from 'src/app/authenticate/services/authenticate.service';
import { WishlistsService } from 'src/app/wishlists/services/wishlists.service';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.css']
})
export class MenuItemCardComponent {
  @Input() menuItem = {} as MenuItemDto;

  faCartShopping = faCartShopping;
  faHeart = faHeart;

  constructor(
    private customerCartService: CustomerCartService,
    private wishListsService: WishlistsService,
    private authenticateService: AuthenticateService,
    private router: Router,
    private toastr: ToastrService) {
  }

  onAddToCart() {
    if (!this.authenticateService.isLoggedIn()) {
      this.toastr.warning('Bạn cần đăng nhập để có thể thêm vào giỏ hàng!');
      this.router.navigate(['/authen/login']);
      return;
    }

    const setCartItemRequest: SetCartItemRequest = {
      menuItemId: this.menuItem.id,
      quantity: 1,
    };

    this.customerCartService.updateCartItem(setCartItemRequest).subscribe(() => {
      this.toastr.success('Đã thêm vào giỏ hàng!');
    });
  }

  onAddToWishList() {
    if (!this.authenticateService.isLoggedIn()) {
      this.toastr.warning('Bạn cần đăng nhập để có thể thêm vào yêu thích!');
      this.router.navigate(['/authen/login']);
      return;
    }

    const setWishListItemRequest: SetWishListItemRequest = {
      menuItemId: this.menuItem.id,
    };

    this.wishListsService.updateWishListItem(setWishListItemRequest).subscribe(() => {
      this.toastr.success('Đã thêm vào yêu thích!');
    });
  }
}
