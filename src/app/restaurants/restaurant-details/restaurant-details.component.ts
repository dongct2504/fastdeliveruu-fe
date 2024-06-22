import { Component, OnInit } from '@angular/core';
import { RestaurantDetailDto } from 'src/app/shared/models/restaurants/restaurantDetailDto';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant?: RestaurantDetailDto;

  constructor(private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.restaurantService.getRestaurant(id).subscribe(restaurant => {
      this.restaurant = restaurant;
    });
  }
}
