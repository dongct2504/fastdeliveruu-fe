import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUserDetailDto } from 'src/app/shared/models/authenticate/appUserDetailDto';
import { UpdateProfilePictureCommand } from 'src/app/shared/models/authenticate/updateProfilePictureRequest';
import { UpdateUserRequest } from 'src/app/shared/models/authenticate/updateUserRequest';
import { environment } from 'src/environments/environment.development';

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

  public updateProfilePicture(id: string, request: UpdateProfilePictureCommand) {
    const formData = new FormData();
    formData.append('id', request.id);
    formData.append('imageFile', request.imageFile);
    return this.httpClient.put(`${this.apiUrl}/users/update-profile-picture/${id}`, formData);
  }

  public updatePhoneNumber(phoneNumber: string) {
    return this.httpClient.put(`${this.apiUrl}/users/update-phone-number/${phoneNumber}`, {});
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
    if (updateUserRequest.houseNumber) {
      formData.append('houseNumber', updateUserRequest.houseNumber);
    }
    if (updateUserRequest.streetName) {
      formData.append('streetName', updateUserRequest.streetName);
    }
    if (updateUserRequest.wardId) {
      formData.append('wardId', updateUserRequest.wardId);
    }
    if (updateUserRequest.districtId) {
      formData.append('districtId', updateUserRequest.districtId);
    }
    if (updateUserRequest.cityId) {
      formData.append('cityId', updateUserRequest.cityId);
    }
    if (updateUserRequest.role) {
      formData.append('role', updateUserRequest.role);
    }

    return formData;
  }
}
