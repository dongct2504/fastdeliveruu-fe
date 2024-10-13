import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../menu-items.service';
import { MenuItemDetailDto } from 'src/app/shared/models/menuItems/menuItemDetailDto';
import { ActivatedRoute, Router } from '@angular/router';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';
import { SetCartItemRequest } from 'src/app/shared/models/shoppingCarts/setCartItemRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.css']
})
export class MenuItemDetailsComponent implements OnInit {
  menuItem?: MenuItemDetailDto;
  quantity = 1;

  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;

  constructor(private menuItemsService: MenuItemsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private customerCartService: CustomerCartService) {
  }

  ngOnInit(): void {
    this.getMenuItem();
  }

  addToCart() {
    if (this.menuItem) {
      const setCartItemRequest: SetCartItemRequest = {
        menuItemId: this.menuItem.id,
        quantity: this.quantity
      };
      this.customerCartService.updateCartItem(setCartItemRequest).subscribe(() => {
        this.toastr.success('Đã thêm vào giỏ hàng!');
        this.router.navigate(['/carts']);
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

  private getMenuItem() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.menuItemsService.getMenuItem(id).subscribe(menuItem => {
      this.menuItem = menuItem;
    })
  }
}