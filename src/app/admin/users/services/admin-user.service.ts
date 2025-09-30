import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { PagedList } from 'src/app/shared/models/PagedList';
import { AppUserWithRolesDto } from 'src/app/shared/models/users/appUserWithRolesDto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUsersWithRoles(defaultParams: DefaultParams) {
    let params = new HttpParams()
      .set('pageNumber', defaultParams.pageNumber)
      .set('pageSize', defaultParams.pageSize)
      .set('sort', defaultParams.sort || '')
      .set('search', defaultParams.search || '');

    return this.httpClient.get<PagedList<AppUserWithRolesDto>>(`${this.apiUrl}/admin/get-users-with-roles`, { params });
  }

  toggleUserLock(username: string, action: 'lock' | 'unlock') {
    return this.httpClient.post(`${this.apiUrl}/admin/toggle-lock`, { userName: username, action: action });
  }

  updateUserRoles(id: string, roles: string) {
    return this.httpClient.post(`${this.apiUrl}/admin/edit-user-roles/${id}`, JSON.stringify(roles), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
