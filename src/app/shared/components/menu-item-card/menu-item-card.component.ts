import { Component, Input } from '@angular/core';
import { MenuItemDto } from '../../models/menuItems/menuItemDto';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';
import { AuthenticateService } from 'src/app/authenticate/authenticate.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetCartItemRequest } from '../../models/shoppingCarts/setCartItemRequest';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.css']
})
export class MenuItemCardComponent {
  @Input() menuItem = {} as MenuItemDto;

  faCartShopping = faCartShopping;

  constructor(
    private customerCartService: CustomerCartService,
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
      menuItemId: this.menuItem.menuItemId,
      quantity: 1
    };

    this.customerCartService.updateCartItem(setCartItemRequest).subscribe(() => {
      this.toastr.success('Đã thêm vào giỏ hàng!');
    });
  }
}
