import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faCartShopping, faHistory, faSearch, faSignOut, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/authenticate/authenticate.service';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';
import { AppUserDto } from 'src/app/shared/models/authenticate/appUserDto';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  faSearch = faSearch;
  faCartShopping = faCartShopping;
  faBars = faBars;
  faUserCircle = faUserCircle;
  faHistory = faHistory;
  faSignOut = faSignOut;
  faUser = faUser;

  totalQuantity$?: Observable<number>
  currentUser$?: Observable<AppUserDto | null>

  constructor(
    public customerCartService: CustomerCartService,
    private authenticateService: AuthenticateService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.totalQuantity$ = this.customerCartService.totalQuantity$;
    this.currentUser$ = this.authenticateService.currentUser$;
  }

  logout() {
    this.authenticateService.logout();
    this.customerCartService.removeTotalQuantity();
    this.toastr.success('Đăng xuất thành công!');
    this.router.navigate(['/']);
  }
}
