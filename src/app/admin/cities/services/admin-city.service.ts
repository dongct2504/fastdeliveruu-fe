import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityDto } from 'src/app/shared/models/addresses/cityDto';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { PagedList } from 'src/app/shared/models/PagedList';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminCityService {
  private apiUrl = `${environment.apiUrl}/cities`;

  constructor(private http: HttpClient) { }

  // Lấy danh sách có phân trang + search
  getAllCities(params?: DefaultParams): Observable<PagedList<CityDto>> {
    let httpParams = new HttpParams();
    if (params) {
      httpParams = httpParams
        .set('pageNumber', params.pageNumber.toString())
        .set('pageSize', params.pageSize.toString())
        .set('sort', params.sort || '')
        .set('search', params.search || '');
    }

    return this.http.get<PagedList<CityDto>>(this.apiUrl, { params: httpParams });
  }

  getCityById(id: number): Observable<CityDto> {
    return this.http.get<CityDto>(`${this.apiUrl}/${id}`);
  }

  createCity(city: Partial<CityDto>): Observable<CityDto> {
    return this.http.post<CityDto>(this.apiUrl, city);
  }

  updateCity(id: number, city: Partial<CityDto>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, city);
  }

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
