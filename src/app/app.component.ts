import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './authenticate/authenticate.service';
import { CustomerCartService } from './customer-cart/customer-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FastDeliveruu';

  constructor(private authenService: AuthenticateService, private customerCartService: CustomerCartService) {
  }

  ngOnInit(): void {
    this.authenService.loadCurrentUser();

    this.authenService.currentUser$.subscribe(authen => {
      if (authen) {
        this.customerCartService.loadTotalQuantity();
      }
    })
  }
}
