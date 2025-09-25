import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { PagedList } from '../models/PagedList';
import { CityDto } from '../models/addresses/cityDto';
import { DistrictDto } from '../models/addresses/districtDto';
import { WardDto } from '../models/addresses/wardDto';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getAllCities() {
    return this.httpClient.get<PagedList<CityDto>>(`${this.apiUrl}/cities?pageSize=200`);
  }

  public getCityById(cityId: number) {
    return this.httpClient.get<CityDto>(`${this.apiUrl}/cities/${cityId}`);
  }

  public getDistrictsByCity(cityId: number) {
    return this.httpClient.get<PagedList<DistrictDto>>(`${this.apiUrl}/districts/get-by-city?cityId=${cityId}&pageSize=200`);
  }

  public getDistrictById(districtId: number) {
    return this.httpClient.get<DistrictDto>(`${this.apiUrl}/districts/${districtId}`)
  }

  public getWardsByDistrict(districtId: number) {
    return this.httpClient.get<PagedList<WardDto>>(`${this.apiUrl}/wards/get-by-district?districtId=${districtId}&pageSize=200`);
  }

  public getWardById(wardId: number) {
    return this.httpClient.get<WardDto>(`${this.apiUrl}/wards/${wardId}`)
  }
}
