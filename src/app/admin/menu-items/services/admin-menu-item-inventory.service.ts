import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemInventoryDto } from 'src/app/shared/models/menuItems/menuItemInventoryDto';
import { UpdateMenuItemInventoryCommand } from 'src/app/shared/models/menuItems/updateMenuItemInventoryCommand';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuItemInventoryService {
  baseUrl = environment.apiUrl + '/menu-item-inventories';

  constructor(private http: HttpClient) { }

  getInventoryById(id: string): Observable<MenuItemInventoryDto> {
    return this.http.get<MenuItemInventoryDto>(`${this.baseUrl}/${id}`);
  }

  updateInventory(command: UpdateMenuItemInventoryCommand): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}`, command);
  }
}
