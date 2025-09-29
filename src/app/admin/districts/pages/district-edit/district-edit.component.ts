import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityDto } from 'src/app/shared/models/addresses/cityDto';
import { AdminDistrictService } from '../../services/admin-district.service';
import { AdminCityService } from 'src/app/admin/cities/services/admin-city.service';
import { ToastrService } from 'ngx-toastr';
import { DistrictDto } from 'src/app/shared/models/addresses/districtDto';

@Component({
  selector: 'app-district-edit',
  templateUrl: './district-edit.component.html',
  styleUrls: ['./district-edit.component.css']
})
export class DistrictEditComponent implements OnInit {
  districtForm!: FormGroup;
  isEditMode = false;
  districtId!: number;
  cities: CityDto[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private districtService: AdminDistrictService,
    private cityService: AdminCityService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.districtId = idParam ? +idParam : 0;
    this.isEditMode = !!this.districtId;

    this.initForm();
    this.loadCities();

    if (this.isEditMode) {
      this.loadDistrict();
    }
  }

  initForm() {
    this.districtForm = this.fb.group({
      name: ['', Validators.required],
      cityId: [null, Validators.required]
    });
  }

  loadCities() {
    // lấy danh sách city cho dropdown
    this.cityService.getAllCities({ pageNumber: 1, pageSize: 100, sort: '', search: '' })
      .subscribe(res => {
        this.cities = res.items;
      });
  }

  loadDistrict() {
    this.districtService.getDistrictById(this.districtId).subscribe((res: DistrictDto) => {
      this.districtForm.patchValue(res);
    });
  }

  onSubmit() {
    if (this.districtForm.invalid) return;

    const payload = this.districtForm.value;

    if (this.isEditMode) {
      payload.id = this.districtId;
      this.districtService.updateDistrict(this.districtId, payload).subscribe(() => {
        this.toastr.success('Cập nhật quận/huyện thành công!');
        this.router.navigate(['/admin/districts']);
      });
    } else {
      this.districtService.createDistrict(payload).subscribe(() => {
        this.toastr.success('Thêm quận/huyện thành công!');
        this.router.navigate(['/admin/districts']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/districts']);
  }
}
