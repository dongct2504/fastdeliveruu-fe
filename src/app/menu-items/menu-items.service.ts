import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedList } from '../shared/models/PagedList';
import { environment } from 'src/environments/environment.development';
import { GenreDto } from '../shared/models/genres/genreDto';
import { MenuItemDto } from '../shared/models/menuItems/menuItemDto';
import { MenuItemParams } from '../shared/models/menuItems/menuItemParams';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getMenuItems(menuItemParams?: MenuItemParams) {
    const params = this.addMenuItemParams(menuItemParams);

    return this.httpClient.get<PagedList<MenuItemDto>>(`${this.apiUrl}/menu-items`, { params });
  }

  public getGenres() {
    return this.httpClient.get<GenreDto[]>(`${this.apiUrl}/genres`);
  }

  private addMenuItemParams(menuItemParams?: MenuItemParams) {
    let params = new HttpParams();

    if (!menuItemParams) {
      return new HttpParams();
    }

    if (menuItemParams.genreId != null && menuItemParams.genreId !== '') {
      params = params.append('genreId', menuItemParams.genreId.toString());
    }

    if (menuItemParams.restaurantId != null && menuItemParams.restaurantId !== '') {
      params = params.append('restaurantId', menuItemParams.restaurantId.toString());
    }

    params = params.append('sort', menuItemParams.sort);

    if (menuItemParams.search !== '') {
      params = params.append('search', menuItemParams.search);
    }

    params = params.append('page', menuItemParams.page.toString());

    return params;
  }
}
