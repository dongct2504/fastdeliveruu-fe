import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faCartShopping, faCogs, faHeart, faHistory, faSearch, faSignOut, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/authenticate/services/authenticate.service';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';
import { RoleConstants } from 'src/app/shared/constants/role-constants';
import { AppUserDto } from 'src/app/shared/models/authenticate/appUserDto';
import { WishlistsService } from 'src/app/wishlists/services/wishlists.service';

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
  faCogs = faCogs

  cartTotalQuantity$?: Observable<number>;
  wishListTotalQuantity$?: Observable<number>;
  currentUser$?: Observable<AppUserDto | null>;

  constructor(
    public customerCartService: CustomerCartService,
    public wishListsService: WishlistsService,
    private authenticateService: AuthenticateService,
    private router: Router,
    private toastr: ToastrService) {
  }

  get roleConstants() {
    return RoleConstants;
  }

  ngOnInit(): void {
    this.cartTotalQuantity$ = this.customerCartService.totalQuantity$;
    this.wishListTotalQuantity$ = this.wishListsService.totalQuantity$;
    this.currentUser$ = this.authenticateService.currentUser$;
  }

  logout() {
    this.authenticateService.logout();
    this.customerCartService.removeTotalQuantity();
    this.wishListsService.removeTotalQuantity();
    this.toastr.success('Đăng xuất thành công!');
    this.router.navigate(['/']);
  }

  isExistRole(role: string, user: AppUserDto | null): boolean {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  }
}
