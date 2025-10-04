import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppUserDetailDto } from '../../shared/models/authenticate/appUserDetailDto';
import { AddressService } from '../../shared/services/address.service';
import { CityDto } from '../../shared/models/addresses/cityDto';
import { DistrictDto } from '../../shared/models/addresses/districtDto';
import { WardDto } from '../../shared/models/addresses/wardDto';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';
import { AuthenticateService } from 'src/app/authenticate/services/authenticate.service';
import { UpdateUserRequest } from 'src/app/shared/models/authenticate/updateUserRequest';
import { UpdateProfilePictureCommand } from 'src/app/shared/models/authenticate/updateProfilePictureRequest';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userProfile = {} as AppUserDetailDto;

  city?: CityDto;
  district?: DistrictDto;
  ward?: WardDto;

  selectedImageFile?: File;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private usersService: UsersService,
    private authService: AuthenticateService,
    private addressService: AddressService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.usersService.getCurrentUser().subscribe(appUserDetailDto => {
      this.userProfile = appUserDetailDto;

      if (appUserDetailDto.imageUrl) {
        this.previewUrl = appUserDetailDto.imageUrl;
      }

      if (appUserDetailDto.cityId) {
        this.getCityById(appUserDetailDto.cityId);
        if (appUserDetailDto.districtId) {
          this.getDistrictById(appUserDetailDto.districtId);
        }
        if (appUserDetailDto.wardId) {
          this.getWardById(appUserDetailDto.wardId);
        }
      }
    });
  }

  private getCityById(cityId: number) {
    this.addressService.getCityById(cityId).subscribe(cityDto => {
      this.city = cityDto;
    });
  }

  private getDistrictById(districtId: number) {
    this.addressService.getDistrictById(districtId).subscribe(districtDto => {
      this.district = districtDto;
    });
  }

  private getWardById(wardId: number) {
    this.addressService.getWardById(wardId).subscribe(wardDto => {
      this.ward = wardDto;
    });
  }

  onFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
    if (this.selectedImageFile) {
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  updateAvatar() {
    if (!this.selectedImageFile) {
      this.toastr.warning('Vui lòng chọn ảnh trước!');
      return;
    }

    const payload: UpdateProfilePictureCommand = {
      id: this.userProfile.id,
      imageFile: this.selectedImageFile
    };

    this.usersService.updateProfilePicture(this.userProfile.id, payload)
      .subscribe(() => {
        this.toastr.success('Cập nhật ảnh đại diện thành công');
        this.getCurrentUser();
      });
  }

  initiatePhoneNumberConfirmation() {
    const phoneNumber = this.userProfile.phoneNumber;
    if (!phoneNumber) return;

    if (confirm(`Bạn có chắc chắn muốn gửi mã OTP đến số điện thoại ${phoneNumber}?`)) {
      this.authService.sendConfirmPhoneNumber(phoneNumber).subscribe(() => {
        this.toastr.info('Đã gửi mã OTP đến điện thoại!');
        this.confirmPhoneNumber();
      });
    }
  }

  confirmPhoneNumber() {
    const otpCode = prompt('Nhập mã OTP:');
    if (otpCode) {
      this.authService.confirmPhoneNumber(otpCode).subscribe(() => {
        this.toastr.success('Xác thực số điện thoại thành công!');
        this.userProfile.phoneNumberConfirmed = true;
      });
    }
  }

  updatePhoneNumber() {
    const updatePhone = prompt('Vui lòng nhập số điện thoại mới:');
    if (updatePhone) {
      this.usersService.updatePhoneNumber(updatePhone).subscribe(() => {
        this.toastr.info('Cập nhật số điện thoại thành công.');
        this.userProfile.phoneNumber = updatePhone;
        this.userProfile.phoneNumberConfirmed = false;
      });
    }
  }

  formatPhone(phone: string): string {
    if (!phone) return '';
    if (phone.startsWith('+84')) {
      return '0' + phone.substring(3);
    }
    return phone;
  }
}
