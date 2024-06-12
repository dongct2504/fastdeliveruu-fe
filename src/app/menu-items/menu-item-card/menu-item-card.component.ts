import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { MenuItemDto } from 'src/app/shared/models/menuItems/menuItemDto';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.css']
})
export class MenuItemCardComponent {
  @Input() menuItem = {} as MenuItemDto;

  @Output() addtoCart = new EventEmitter();

  faCartShopping = faCartShopping;

  constructor() {

  }

  onAddToCart() {
    this.addtoCart.emit(this.menuItem.menuItemId);
  }
}
