import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AppUserDetailDto } from '../shared/models/authenticate/appUserDetailDto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getCurrentUser() {
    return this.httpClient.get<AppUserDetailDto>(`${this.apiUrl}/users/current-user`);
  }
}
