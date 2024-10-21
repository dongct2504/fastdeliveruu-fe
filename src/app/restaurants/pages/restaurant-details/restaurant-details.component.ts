import { Component, OnInit } from '@angular/core';
import { RestaurantDetailDto } from 'src/app/shared/models/restaurants/restaurantDetailDto';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/shared/services/address.service';
import { RestaurantHourDto } from 'src/app/shared/models/restaurants/restaurantHourDto';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant?: RestaurantDetailDto;
  operatingHours: RestaurantHourDto[] = [];

  ward?: string;
  district?: string;
  city?: string;

  constructor(
    private restaurantService: RestaurantService,
    private addressService: AddressService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.restaurantService.getRestaurant(id).subscribe(restaurant => {
      this.restaurant = restaurant;
      this.operatingHours = restaurant.restaurantHourDtos;

      this.getCityById(restaurant.cityId);
      this.getDistrictById(restaurant.districtId);
      this.getWardById(restaurant.wardId);
    });
  }

  private getCityById(cityId: number) {
    this.addressService.getCityById(cityId).subscribe(city => {
      this.city = city.name;
    });
  }

  private getDistrictById(districtId: number) {
    this.addressService.getDistrictById(districtId).subscribe(district => {
      this.district = district.name;
    });
  }

  private getWardById(wardId: number) {
    this.addressService.getWardById(wardId).subscribe(ward => {
      this.ward = ward.name;
    });
  }
}
