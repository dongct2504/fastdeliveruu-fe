import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantConstant } from 'src/app/shared/constants/restaurant-constants';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { PagedList } from 'src/app/shared/models/PagedList';
import { RestaurantDetailDto } from 'src/app/shared/models/restaurants/restaurantDetailDto';
import { RestaurantDto } from 'src/app/shared/models/restaurants/restaurantDto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminRestaurantService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllRestaurants(params: DefaultParams) {
    let httpParams = new HttpParams()
      .set('pageNumber', params.pageNumber)
      .set('pageSize', params.pageSize)
      .set('sort', params.sort || RestaurantConstant.LatestUpdateDesc)
      .set('search', params.search || '');

    return this.httpClient.get<PagedList<RestaurantDto>>(
      `${this.apiUrl}/restaurants`,
      { params: httpParams }
    );
  }

  getRestaurantById(id: string) {
    return this.httpClient.get<RestaurantDetailDto>(
      `${this.apiUrl}/restaurants/${id}`
    );
  }

  createRestaurant(formData: FormData) {
    return this.httpClient.post<RestaurantDto>(
      `${this.apiUrl}/restaurants`,
      formData
    );
  }

  updateRestaurant(id: string, formData: FormData) {
    return this.httpClient.put<void>(
      `${this.apiUrl}/restaurants/${id}`,
      formData
    );
  }

  deleteRestaurant(id: string) {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/restaurants/${id}`
    );
  }
}
