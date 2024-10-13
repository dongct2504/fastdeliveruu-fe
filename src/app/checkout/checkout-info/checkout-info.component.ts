import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AuthenticateService } from 'src/app/authenticate/authenticate.service';
import { CityDto } from 'src/app/shared/models/addresses/cityDto';
import { DistrictDto } from 'src/app/shared/models/addresses/districtDto';
import { WardDto } from 'src/app/shared/models/addresses/wardDto';
import { UpdateUserRequest } from 'src/app/shared/models/authenticate/updateUserRequest';
import { AddressService } from 'src/app/shared/services/address.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-checkout-info',
  templateUrl: './checkout-info.component.html',
  styleUrls: ['./checkout-info.component.css']
})
export class CheckoutInfoComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;

  cities: CityDto[] = [];
  districts: DistrictDto[] = [];
  wards: WardDto[] = [];

  constructor(
    private authenticateService: AuthenticateService,
    private addressService: AddressService,
    private usersService: UsersService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getInfoFormValues();
  }

  private getInfoFormValues() {
    this.usersService.getCurrentUser().subscribe(userDetail => {
      this.checkoutForm?.get('infoForm')?.patchValue(userDetail);

      this.loadCities();
      if (userDetail.cityId) {
        this.loadDistrictsByCityId(userDetail.cityId);
        if (userDetail.districtId) {
          this.loadWardsByDistrictId(userDetail.districtId);
        }
      }
    });
  }

  private loadCities() {
    this.addressService.getAllCities().subscribe(pagedList => {
      this.cities = pagedList.items;
    });
  }

  private loadDistrictsByCityId(cityId: number) {
    this.addressService.getDistrictsByCity(cityId).subscribe(pagedList => {
      this.districts = pagedList.items;
    });
  }

  private loadWardsByDistrictId(districtId: number) {
    this.addressService.getWardsByDistrict(districtId).subscribe(pagedList => {
      this.wards = pagedList.items;
    });
  }

  onCityChange(event: Event) {
    const cityId: number = Number.parseInt((event.target as HTMLSelectElement).value);
    if (cityId) {
      this.addressService.getDistrictsByCity(cityId).subscribe(districtList => {
        this.districts = districtList.items;
        this.checkoutForm?.get('infoForm')?.patchValue({ districtId: '' });
        this.wards = []; // clear wards if city changes
      });
    }
  }

  onDistrictChange(event: Event) {
    const districtId: number = Number.parseInt((event.target as HTMLSelectElement).value);
    if (districtId) {
      this.addressService.getWardsByDistrict(districtId).subscribe(wardList => {
        this.wards = wardList.items;
        this.checkoutForm?.get('infoForm')?.patchValue({ wardId: '' });
      });
    }
  }

  saveUserInformation() {
    this.authenticateService.currentUser$.pipe(take(1)).subscribe(appUser => {
      if (this.checkoutForm && appUser) {
        const infoFormValues = this.checkoutForm.get('infoForm')?.value;

        const updateUserRequest: UpdateUserRequest = {
          id: appUser.id,
          ...infoFormValues
        }

        this.usersService.updateUser(appUser.id, updateUserRequest).subscribe(() => {
          this.toastr.success('Đã lưu thành công!');
        });
      }
    });
  }
}
