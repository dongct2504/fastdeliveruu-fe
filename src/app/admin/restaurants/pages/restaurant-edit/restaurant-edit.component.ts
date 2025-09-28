import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminRestaurantService } from '../../services/admin-restaurant.service';
import { RestaurantDetailDto } from 'src/app/shared/models/restaurants/restaurantDetailDto';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/shared/services/address.service';
import { CityDto } from 'src/app/shared/models/addresses/cityDto';
import { DistrictDto } from 'src/app/shared/models/addresses/districtDto';
import { WardDto } from 'src/app/shared/models/addresses/wardDto';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent {
  restaurantForm!: FormGroup;
  isEditMode = false;
  restaurantId!: string;

  cities: CityDto[] = [];
  districts: DistrictDto[] = [];
  wards: WardDto[] = [];

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private restaurantService: AdminRestaurantService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id') ?? '';
    this.isEditMode = !!this.restaurantId;

    this.initForm();
    this.loadCities();

    if (this.isEditMode) {
      this.loadRestaurant();
    }
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

  initForm() {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      phoneNumber: ['', Validators.required],
      houseNumber: ['', Validators.required],
      streetName: ['', Validators.required],
      cityId: ['', Validators.required],
      districtId: ['', Validators.required],
      wardId: ['', Validators.required],
    });
  }

  loadRestaurant() {
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe({
      next: (res: RestaurantDetailDto) => {
        this.restaurantForm.patchValue(res);
        this.loadDistrictsByCityId(res.cityId);
        this.loadWardsByDistrictId(res.districtId);
        if (res.imageUrl) {
          this.previewUrl = res.imageUrl; // hiện ảnh cũ
        }
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Preview ảnh
      const reader = new FileReader();
      reader.onload = e => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  onSubmit() {
    if (this.restaurantForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.restaurantForm.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    if (this.isEditMode) {
      formData.append('id', this.restaurantId);
      this.restaurantService.updateRestaurant(this.restaurantId, formData).subscribe(() => {
        this.toastr.success('Cập nhật nhà hàng thành công!');
        this.router.navigate(['/admin/restaurants']);
      });
    } else {
      this.restaurantService.createRestaurant(formData).subscribe(() => {
        this.toastr.success('Thêm nhà hàng thành công!');
        this.router.navigate(['/admin/restaurants']);
      });
    }
  }

  onCityChange(event: Event) {
    const cityId: number = Number.parseInt((event.target as HTMLSelectElement).value);
    if (cityId) {
      this.addressService.getDistrictsByCity(cityId).subscribe(districtList => {
        this.districts = districtList.items;
        this.restaurantForm?.patchValue({ districtId: '' });
        this.wards = []; // clear wards if city changes
      });
    }
  }

  onDistrictChange(event: Event) {
    const districtId: number = Number.parseInt((event.target as HTMLSelectElement).value);
    if (districtId) {
      this.addressService.getWardsByDistrict(districtId).subscribe(wardList => {
        this.wards = wardList.items;
        this.restaurantForm?.patchValue({ wardId: '' });
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/restaurants']);
  }
}
