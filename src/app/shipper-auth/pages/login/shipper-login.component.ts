import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipperAuthenticateService } from '../../services/shipper-authenticate.service';

@Component({
  selector: 'app-shipper-login',
  templateUrl: './shipper-login.component.html',
  styleUrls: ['./shipper-login.component.css']
})
export class ShipperLoginComponent implements OnInit {
  loginForm = {} as FormGroup;
  validationErrors: ValidationErrors[] = [];
  returnUrl = '';

  constructor(
    private fb: FormBuilder,
    private shipperAuthService: ShipperAuthenticateService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.shipperAuthService.login(this.loginForm.value).subscribe(() => {
      this.toastr.success('Đăng nhập Shipper thành công!');
      this.router.navigate([this.returnUrl]);
    }, err => {
      this.validationErrors = err;
    });
  }
}
