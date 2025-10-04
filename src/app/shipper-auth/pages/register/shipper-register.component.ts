import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AddressService } from 'src/app/shared/services/address.service';
import { CityDto } from 'src/app/shared/models/addresses/cityDto';
import { DistrictDto } from 'src/app/shared/models/addresses/districtDto';
import { WardDto } from 'src/app/shared/models/addresses/wardDto';
import { ShipperAuthenticateService } from '../../services/shipper-authenticate.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shipper-register',
  templateUrl: './shipper-register.component.html',
  styleUrls: ['./shipper-register.component.css']
})
export class ShipperRegisterComponent implements OnInit {
  registerForm = {} as FormGroup;
  validationErrors: ValidationErrors[] = [];
  cities: CityDto[] = [];
  districts: DistrictDto[] = [];
  wards: WardDto[] = [];

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private shipperAuthService: ShipperAuthenticateService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initCities();

    this.registerForm.get('cityId')?.valueChanges.subscribe(cityId => this.onCityChange(cityId));
    this.registerForm.get('districtId')?.valueChanges.subscribe(districtId => this.onDistrictChange(districtId));
  }

  private initCities() {
    this.addressService.getAllCities().subscribe(pl => this.cities = pl.items);
  }

  private onCityChange(cityId: number) {
    if (cityId) {
      this.addressService.getDistrictsByCity(cityId).subscribe(d => {
        this.districts = d.items;
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
      this.addressService.getWardsByDistrict(districtId).subscribe(w => {
        this.wards = w.items;
        this.registerForm.get('wardId')?.reset();
      });
    } else {
      this.wards = [];
      this.registerForm.get('wardId')?.reset();
    }
  }

  private passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  private initForm() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      citizenIdentification: ['', [Validators.required, Validators.maxLength(12)]],
      userName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      wardId: ['', [Validators.required]],
      districtId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      modelType: ['']
    }, { validators: this.passwordsMatchValidator });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const payload = { ...this.registerForm.value };
    delete payload.confirmPassword;

    this.shipperAuthService.register(payload).subscribe(() => {
      this.toastr.success('Đăng ký thành công, vui lòng xác nhận email trước khi đăng nhập!');
      this.router.navigate(['/shipper-auth/confirm-email']);
    }, err => this.validationErrors = err);
  }
}
