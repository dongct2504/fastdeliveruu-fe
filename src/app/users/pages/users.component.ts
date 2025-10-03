import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppUserDetailDto } from '../../shared/models/authenticate/appUserDetailDto';
import { AddressService } from '../../shared/services/address.service';
import { CityDto } from '../../shared/models/addresses/cityDto';
import { DistrictDto } from '../../shared/models/addresses/districtDto';
import { WardDto } from '../../shared/models/addresses/wardDto';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';
import { AuthenticateService } from 'src/app/authenticate/services/authenticate.service';

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

  otpCode: string = '';
  phoneNumber: string = '';

  constructor(
    private usersService: UsersService,
    private authService: AuthenticateService,
    private addressService: AddressService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.usersService.getCurrentUser().subscribe(appUserDetailDto => {
      this.userProfile = appUserDetailDto;

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

  private sendOtp(phoneNumber: string) {
    this.authService.sendConfirmPhoneNumber(phoneNumber).subscribe(
      response => {
        this.toastr.info('Đã gửi mã OTP đến điện thoại!');
        this.confirmPhoneNumber();
      }
    );
  }

  initiatePhoneNumberConfirmation() {
    const phoneNumber = this.userProfile.phoneNumber;

    const confirmMessage = `Bạn có chắc chắn muốn gửi mã OTP đến số điện thoại ${phoneNumber}? (Nhập 'yes' để xác nhận)`;
    const userResponse = prompt(confirmMessage);

    if (userResponse && userResponse.toLowerCase() === 'yes') {
      this.sendOtp(phoneNumber);
    } else {
      this.toastr.info('Gửi mã OTP đã bị hủy.');
    }
  }

  confirmPhoneNumber() {
    const otpCode = prompt('Đã gửi mã OTP đến số điện thoại của bạn. Vui lòng nhập mã OTP để xác thực:');

    if (otpCode) {
      this.authService.confirmPhoneNumber(otpCode).subscribe(
        response => {
          this.toastr.success('Xác thực số điện thoại thành công!');
          this.userProfile.phoneNumberConfirmed = true;
        }
      );
    }
  }

  public updatePhoneNumber() {
    const updatePhone = prompt('Vui lòng nhập số điện thoại mới:');

    if (updatePhone) {
      this.usersService.updatePhoneNumber(updatePhone).subscribe(
        (response) => {
          this.toastr.info('Cập nhật số điện thoại thành công.');
          this.userProfile.phoneNumber = updatePhone;
        }
      );
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
