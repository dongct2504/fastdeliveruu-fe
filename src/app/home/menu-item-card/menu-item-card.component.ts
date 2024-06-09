import { Component, Input } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { MenuItemDto } from 'src/app/shared/models/menuItems/menuItemDto';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.css']
})
export class MenuItemCardComponent {
  @Input() menuItem = {} as MenuItemDto;

  faCartShopping = faCartShopping;

  constructor() {

  }
}
