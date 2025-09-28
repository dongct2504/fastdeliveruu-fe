import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemDetailDto } from 'src/app/shared/models/menuItems/menuItemDetailDto';
import { MenuItemDto } from 'src/app/shared/models/menuItems/menuItemDto';
import { MenuItemParams } from 'src/app/shared/models/menuItems/menuItemParams';
import { PagedList } from 'src/app/shared/models/PagedList';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuItemService {
  baseUrl = environment.apiUrl + '/menu-items';

  constructor(private http: HttpClient) { }

  getAll(params: MenuItemParams): Observable<PagedList<MenuItemDto>> {
    let httpParams = new HttpParams();
    if (params.pageNumber) httpParams = httpParams.append('pageNumber', params.pageNumber);
    if (params.pageSize) httpParams = httpParams.append('pageSize', params.pageSize);
    if (params.search) httpParams = httpParams.append('searchTerm', params.search);
    if (params.restaurantId) httpParams = httpParams.append('restaurantId', params.restaurantId);
    if (params.genreId) httpParams = httpParams.append('genreId', params.genreId);

    return this.http.get<PagedList<MenuItemDto>>(this.baseUrl, { params: httpParams });
  }

  getById(id: string): Observable<MenuItemDetailDto> {
    return this.http.get<MenuItemDetailDto>(`${this.baseUrl}/${id}`);
  }

  create(formData: FormData): Observable<MenuItemDto> {
    return this.http.post<MenuItemDto>(this.baseUrl, formData);
  }

  update(id: string, formData: FormData): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, formData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
