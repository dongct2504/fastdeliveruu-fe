import { Component, OnInit } from '@angular/core';
import { CustomerCartService } from './customer-cart/customer-cart.service';
import { take } from 'rxjs';
import { AuthenticateService } from './authenticate/services/authenticate.service';
import { WishlistsService } from './wishlists/services/wishlists.service';
import { ShipperAuthenticateService } from './shipper-auth/services/shipper-authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FastDeliveruu';

  constructor(
    private authenService: AuthenticateService,
    private wishListsService: WishlistsService,
    private customerCartService: CustomerCartService,
    private shipperAuthService: ShipperAuthenticateService) {
  }

  ngOnInit(): void {
    this.authenService.loadCurrentUser();
    this.shipperAuthService.loadCurrentShipper();

    this.authenService.currentUser$.pipe(take(1)).subscribe(currentUser => {
      if (currentUser) {
        this.customerCartService.loadTotalQuantity();
        this.customerCartService.calculateTotals();

        this.wishListsService.loadTotalQuantity();
      }
    })
  }
}
