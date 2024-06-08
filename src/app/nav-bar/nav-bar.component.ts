import { Component, OnInit } from '@angular/core';
import { faBars, faCartShopping, faSearch, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  faSearch = faSearch;
  faCartShopping = faCartShopping;
  faBars = faBars

  constructor() {
  }

  ngOnInit(): void {
  }
}
