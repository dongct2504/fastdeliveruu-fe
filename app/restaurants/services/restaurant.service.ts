import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedList } from 'src/app/shared/models/PagedList';
import { RestaurantDetailDto } from 'src/app/shared/models/restaurants/restaurantDetailDto';
import { RestaurantDto } from 'src/app/shared/models/restaurants/restaurantDto';
import { RestaurantParams } from 'src/app/shared/models/restaurants/restaurantParams';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getRestaurants(restaurantParams?: RestaurantParams) {
    const params = this.addRestaurantParams(restaurantParams);

    return this.httpClient.get<PagedList<RestaurantDto>>(`${this.apiUrl}/restaurants`, { params });
  }

  public getRestaurant(id: string) {
    return this.httpClient.get<RestaurantDetailDto>(`${this.apiUrl}/restaurants/${id}`);
  }

  private addRestaurantParams(restaurantParams?: RestaurantParams) {
    let params = new HttpParams();

    if (!restaurantParams) {
      return params;
    }

    params = params.append('sort', restaurantParams.sort);

    if (restaurantParams.search !== '') {
      params = params.append('search', restaurantParams.search);
    }

    params = params.append('pageNumber', restaurantParams.pageNumber.toString());

    params = params.append('pageSize', restaurantParams.pageSize.toString());

    return params;
  }
}
