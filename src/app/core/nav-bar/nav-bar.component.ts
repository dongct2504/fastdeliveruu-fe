import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faCartShopping, faHeart, faHistory, faSearch, faSignOut, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/authenticate/services/authenticate.service';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';
import { AppUserDto } from 'src/app/shared/models/authenticate/appUserDto';
import { WishlistsService } from 'src/app/wishlists/services/wishlists.service';
import { ShipperAuthenticateService } from 'src/app/shipper-auth/services/shipper-authenticate.service';
import { ShipperDto } from 'src/app/shared/models/shipper/shipperDto';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  faSearch = faSearch;
  faCartShopping = faCartShopping;
  faHeart = faHeart;
  faBars = faBars;
  faUserCircle = faUserCircle;
  faHistory = faHistory;
  faSignOut = faSignOut;
  faUser = faUser;

  cartTotalQuantity$?: Observable<number>;
  wishListTotalQuantity$?: Observable<number>;
  currentUser$?: Observable<AppUserDto | null>;
  currentShipper$?: Observable<ShipperDto | null>;

  constructor(
    public customerCartService: CustomerCartService,
    public wishListsService: WishlistsService,
    private authenticateService: AuthenticateService,
    private shipperAuthenticateService: ShipperAuthenticateService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.cartTotalQuantity$ = this.customerCartService.totalQuantity$;
    this.wishListTotalQuantity$ = this.wishListsService.totalQuantity$;
    this.currentUser$ = this.authenticateService.currentUser$;
    this.currentShipper$ = this.shipperAuthenticateService.currentShipper$;
  }

  logout() {
    this.authenticateService.logout();
    this.customerCartService.removeTotalQuantity();
    this.wishListsService.removeTotalQuantity();
    this.toastr.success('Đăng xuất thành công!');
    this.router.navigate(['/']);
  }

  logoutShipper() {
    this.shipperAuthenticateService.logout();
    this.toastr.success('Đăng xuất Shipper thành công!');
    this.router.navigate(['/']);
  }
}
