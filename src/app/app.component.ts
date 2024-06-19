import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './authenticate/authenticate.service';
import { CustomerCartService } from './customer-cart/customer-cart.service';
import { take } from 'rxjs';

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

    this.authenService.currentUser$.pipe(take(1)).subscribe(currentUser => {
      if (currentUser) {
        this.customerCartService.loadTotalQuantity();
        this.customerCartService.calculateTotals();
      }
    })
  }
}
