import { Component, OnInit } from '@angular/core';
import { RestaurantDto } from 'src/app/shared/models/restaurants/restaurantDto';
import { RestaurantParams } from 'src/app/shared/models/restaurants/restaurantParams';
import { RestaurantService } from '../services/restaurant.service';
import { PageSizeConstants } from 'src/app/shared/common/pageSizeConstants';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants?: RestaurantDto[];

  restaurantParams = new RestaurantParams();
  totalRecords = 0;

  constructor(private restaurantService: RestaurantService) {
    this.restaurantParams.pageSize = PageSizeConstants.pageSize12;
  }

  ngOnInit(): void {
    this.getRestaurants();
  }

  private getRestaurants() {
    this.restaurantService.getRestaurants(this.restaurantParams).subscribe(pagedList => {
      this.restaurants = pagedList.items;
      this.restaurantParams.pageNumber = pagedList.pageNumber;
      this.restaurantParams.pageSize = pagedList.pageSize;
      this.totalRecords = pagedList.totalRecords;
    });
  }

  onPageChanged(event: number) {
    if (this.restaurantParams.pageNumber !== event) {
      this.restaurantParams.pageNumber = event;
      this.getRestaurants();
    }
  }

  onSearchSubmit(event: string) {
    this.restaurantParams.search = event;
    this.restaurantParams.pageNumber = 1;
    this.getRestaurants();
  }
}
