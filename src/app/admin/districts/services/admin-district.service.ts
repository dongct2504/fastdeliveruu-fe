import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DistrictDetailDto } from 'src/app/shared/models/addresses/districtDetailDto';
import { DistrictDto } from 'src/app/shared/models/addresses/districtDto';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { PagedList } from 'src/app/shared/models/PagedList';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminDistrictService {
  private baseUrl = environment.apiUrl + '/districts';

  constructor(private http: HttpClient) { }

  getAllDistricts(params: DefaultParams): Observable<PagedList<DistrictDto>> {
    let httpParams = new HttpParams()
      .set('pageNumber', params.pageNumber)
      .set('pageSize', params.pageSize)
      .set('sort', params.sort || '')
      .set('search', params.search || '');

    return this.http.get<PagedList<DistrictDto>>(this.baseUrl, { params: httpParams });
  }

  getDistrictById(id: number): Observable<DistrictDetailDto> {
    return this.http.get<DistrictDetailDto>(`${this.baseUrl}/${id}`);
  }

  createDistrict(payload: any): Observable<DistrictDto> {
    return this.http.post<DistrictDto>(this.baseUrl, payload);
  }

  updateDistrict(id: number, payload: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  deleteDistrict(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
