import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreDto } from 'src/app/shared/models/genres/genreDto';
import { MenuItemDetailDto } from 'src/app/shared/models/menuItems/menuItemDetailDto';
import { MenuItemDto } from 'src/app/shared/models/menuItems/menuItemDto';
import { MenuItemParams } from 'src/app/shared/models/menuItems/menuItemParams';
import { PagedList } from 'src/app/shared/models/PagedList';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getMenuItems(menuItemParams?: MenuItemParams) {
    const params = this.addMenuItemParams(menuItemParams);

    return this.httpClient.get<PagedList<MenuItemDto>>(`${this.apiUrl}/menu-items`, { params });
  }

  public getGenres() {
    return this.httpClient.get<GenreDto[]>(`${this.apiUrl}/genres`);
  }

  public getMenuItem(id: string) {
    return this.httpClient.get<MenuItemDetailDto>(`${this.apiUrl}/menu-items/${id}`);
  }

  private addMenuItemParams(menuItemParams?: MenuItemParams) {
    let params = new HttpParams();

    if (!menuItemParams) {
      return params;
    }

    if (menuItemParams.genreId != null && menuItemParams.genreId !== '') {
      params = params.append('genreId', menuItemParams.genreId);
    }

    if (menuItemParams.restaurantId != null && menuItemParams.restaurantId !== '') {
      params = params.append('restaurantId', menuItemParams.restaurantId);
    }

    params = params.append('sort', menuItemParams.sort);

    if (menuItemParams.search !== '') {
      params = params.append('search', menuItemParams.search);
    }

    params = params.append('pageNumber', menuItemParams.pageNumber.toString());

    params = params.append('pageSize', menuItemParams.pageSize.toString());

    return params;
  }
}
