import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/shared/services/address.service';
import { CityDto } from 'src/app/shared/models/addresses/cityDto';
import { DistrictDto } from 'src/app/shared/models/addresses/districtDto';
import { WardDto } from 'src/app/shared/models/addresses/wardDto';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = {} as FormGroup;

  validationErrors: ValidationErrors[] = [];

  cities: CityDto[] = [];
  districts: DistrictDto[] = [];
  wards: WardDto[] = [];

  constructor(
    private fb: FormBuilder,
    private authenticateService: AuthenticateService,
    private addressService: AddressService,
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initCities();

    this.registerForm.get('cityId')?.valueChanges.subscribe(cityId => {
      this.onCityChange(cityId);
    });

    this.registerForm.get('districtId')?.valueChanges.subscribe(districtId => {
      this.onDistrictChange(districtId);
    });
  }

  private onCityChange(cityId: number) {
    if (cityId) {
      this.addressService.getDistrictsByCity(cityId).subscribe(districtList => {
        this.districts = districtList.items;
        // Clear the wards and reset the form controls for district and ward
        this.wards = [];
        this.registerForm.get('districtId')?.reset();
        this.registerForm.get('wardId')?.reset();
      });
    } else {
      this.districts = [];
      this.wards = [];
      this.registerForm.get('districtId')?.reset();
      this.registerForm.get('wardId')?.reset();
    }
  }

  private onDistrictChange(districtId: number) {
    if (districtId) {
      this.addressService.getWardsByDistrict(districtId).subscribe(wardList => {
        this.wards = wardList.items;
        // Reset the ward selection
        this.registerForm.get('wardId')?.reset();
      });
    } else {
      this.wards = [];
      this.registerForm.get('wardId')?.reset();
    }
  }

  private initCities() {
    this.addressService.getAllCities().subscribe(pagedList => {
      this.cities = pagedList.items;
    });
  }

  private initForm() {
    this.registerForm = this.fb.group({
      userName: ['', [
        Validators.required
      ]],
      phoneNumber: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required, Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      houseNumber: ['', [
        Validators.required
      ]],
      streetName: ['', [
        Validators.required
      ]],
      wardId: ['', [
        Validators.required
      ]],
      districtId: ['', [
        Validators.required
      ]],
      cityId: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    this.authenticateService.register(this.registerForm.value).subscribe(res => {
      console.log(res.token);
      this.toastr.success('Đăng ký thành công, vui lòng xác nhận email trước khi đăng nhập!');
      this.router.navigate(['/authen/confirm-email']);
    }, err => {
      this.validationErrors = err;
    });
  }
}
