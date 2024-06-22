import { Component, Input } from '@angular/core';
import { RestaurantDto } from '../../models/restaurants/restaurantDto';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent {
  @Input() restaurant = {} as RestaurantDto;
}
