import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCityService } from '../../services/admin-city.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {
  cityForm!: FormGroup;
  isEditMode = false;
  cityId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cityService: AdminCityService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.cityId = idParam ? +idParam : 0;
    this.isEditMode = !!this.cityId;

    this.initForm();

    if (this.isEditMode) {
      this.loadCity();
    }
  }

  initForm() {
    this.cityForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  loadCity() {
    this.cityService.getCityById(this.cityId).subscribe((res) => {
      this.cityForm.patchValue(res);
    });
  }

  onSubmit() {
    if (this.cityForm.invalid) return;

    const payload = this.cityForm.value;

    if (this.isEditMode) {
      payload.id = this.cityId;
      this.cityService.updateCity(this.cityId, payload).subscribe(() => {
        this.toastr.success('Cập nhật thành phố thành công!');
        this.router.navigate(['/admin/cities']);
      });
    } else {
      this.cityService.createCity(payload).subscribe(() => {
        this.toastr.success('Thêm thành phố thành công!');
        this.router.navigate(['/admin/cities']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/cities']);
  }
}
