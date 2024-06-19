import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AppUserDetailDto } from '../shared/models/authenticate/appUserDetailDto';
import { UpdateUserRequest } from '../shared/models/authenticate/updateUserRequest';

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

  public updateUser(id: string, updateUserRequest: UpdateUserRequest) {
    const formData = this.buildFormUpdateUser(updateUserRequest);
    return this.httpClient.put(`${this.apiUrl}/users/${id}`, formData);
  }

  private buildFormUpdateUser(updateUserRequest: UpdateUserRequest) {
    const formData = new FormData();

    formData.append('id', updateUserRequest.id);
    if (updateUserRequest.firstName) {
      formData.append('firstName', updateUserRequest.firstName);
    }
    if (updateUserRequest.lastName) {
      formData.append('lastName', updateUserRequest.lastName);
    }
    formData.append('phoneNumber', updateUserRequest.phoneNumber);
    if (updateUserRequest.address) {
      formData.append('address', updateUserRequest.address);
    }
    if (updateUserRequest.ward) {
      formData.append('ward', updateUserRequest.ward);
    }
    if (updateUserRequest.district) {
      formData.append('district', updateUserRequest.district);
    }
    if (updateUserRequest.city) {
      formData.append('city', updateUserRequest.city);
    }
    if (updateUserRequest.role) {
      formData.append('role', updateUserRequest.role);
    }

    return formData;
  }
}
