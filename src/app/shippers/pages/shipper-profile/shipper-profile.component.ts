import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShipperAuthenticateService } from 'src/app/shipper-auth/services/shipper-authenticate.service';
import { ShipperDto } from 'src/app/shared/models/shipper/shipperDto';
import { AddressService } from 'src/app/shared/services/address.service';
import { CityDto } from 'src/app/shared/models/addresses/cityDto';
import { DistrictDto } from 'src/app/shared/models/addresses/districtDto';
import { WardDto } from 'src/app/shared/models/addresses/wardDto';

@Component({
  selector: 'app-shipper-profile',
  templateUrl: './shipper-profile.component.html',
  styleUrls: ['./shipper-profile.component.css']
})
export class ShipperProfileComponent implements OnInit {
  shipper?: ShipperDto | null;
  city?: CityDto;
  district?: DistrictDto;
  ward?: WardDto;

  constructor(
    private shipperAuthService: ShipperAuthenticateService,
    private addressService: AddressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shipperAuthService.currentShipper$.subscribe(s => {
      this.shipper = s;
      if (!s) {
        this.router.navigate(['/shipper-auth/login']);
        return;
      }

      if (s.cityId) {
        this.addressService.getCityById(s.cityId).subscribe(c => this.city = c);
      }
      if (s.districtId) {
        this.addressService.getDistrictById(s.districtId).subscribe(d => this.district = d);
      }
      if (s.wardId) {
        this.addressService.getWardById(s.wardId).subscribe(w => this.ward = w);
      }
    });
  }
}
