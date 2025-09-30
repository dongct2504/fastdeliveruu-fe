import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DistrictDto } from 'src/app/shared/models/addresses/districtDto';
import { AdminWardService } from '../../services/admin-ward.service';
import { AdminDistrictService } from 'src/app/admin/districts/services/admin-district.service';
import { ToastrService } from 'ngx-toastr';
import { WardDto } from 'src/app/shared/models/addresses/wardDto';

@Component({
  selector: 'app-ward-edit',
  templateUrl: './ward-edit.component.html',
  styleUrls: ['./ward-edit.component.css']
})
export class WardEditComponent implements OnInit {
  wardForm!: FormGroup;
  isEditMode = false;
  wardId!: number;
  districts: DistrictDto[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private wardService: AdminWardService,
    private districtService: AdminDistrictService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.wardId = idParam ? +idParam : 0;
    this.isEditMode = !!this.wardId;

    this.initForm();
    this.loadDistricts();

    if (this.isEditMode) {
      this.loadWard();
    }
  }

  initForm() {
    this.wardForm = this.fb.group({
      name: ['', Validators.required],
      districtId: [null, Validators.required]
    });
  }

  loadDistricts() {
    // lấy danh sách district cho dropdown
    this.districtService.getAllDistricts({ pageNumber: 1, pageSize: 100, sort: '', search: '' })
      .subscribe(res => {
        this.districts = res.items;
      });
  }

  loadWard() {
    this.wardService.getWardById(this.wardId).subscribe((res: WardDto) => {
      this.wardForm.patchValue(res);
    });
  }

  onSubmit() {
    if (this.wardForm.invalid) return;

    const payload = this.wardForm.value;

    if (this.isEditMode) {
      payload.id = this.wardId;
      this.wardService.updateWard(this.wardId, payload).subscribe(() => {
        this.toastr.success('Cập nhật phường/xã thành công!');
        this.router.navigate(['/admin/wards']);
      });
    } else {
      this.wardService.createWard(payload).subscribe(() => {
        this.toastr.success('Thêm phường/xã thành công!');
        this.router.navigate(['/admin/wards']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/wards']);
  }
}
