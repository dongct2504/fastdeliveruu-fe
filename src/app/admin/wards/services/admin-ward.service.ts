import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WardDto } from 'src/app/shared/models/addresses/wardDto';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { PagedList } from 'src/app/shared/models/PagedList';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminWardService {
  private baseUrl = environment.apiUrl + '/wards';

  constructor(private http: HttpClient) { }

  getAllWards(params: DefaultParams): Observable<PagedList<WardDto>> {
    return this.http.get<PagedList<WardDto>>(this.baseUrl, { params: { ...params } });
  }

  getWardById(id: number): Observable<WardDto> {
    return this.http.get<WardDto>(`${this.baseUrl}/${id}`);
  }

  getWardsByDistrict(districtId: number, pageNumber = 1, pageSize = 30): Observable<PagedList<WardDto>> {
    return this.http.get<PagedList<WardDto>>(`${this.baseUrl}/get-by-district`, {
      params: {
        districtId,
        pageNumber,
        pageSize
      }
    });
  }

  createWard(ward: Partial<WardDto>): Observable<WardDto> {
    return this.http.post<WardDto>(this.baseUrl, ward);
  }

  updateWard(id: number, ward: Partial<WardDto>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, ward);
  }

  deleteWard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
