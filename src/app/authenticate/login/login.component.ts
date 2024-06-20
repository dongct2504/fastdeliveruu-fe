import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = {} as FormGroup;

  validationErrors: ValidationErrors[] = [];

  returnUrl = '';

  constructor(
    private fb: FormBuilder,
    private authenticateService: AuthenticateService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerCartService: CustomerCartService) {
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      userName: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
    })
  }

  onSubmit() {
    this.authenticateService.login(this.loginForm.value).subscribe(() => {
      this.toastr.success('Đăng nhập thành công!');
      this.customerCartService.loadTotalQuantity();
      this.customerCartService.calculateTotals();
      this.router.navigate([this.returnUrl]);
    }, err => {
      this.validationErrors = err;
    });
  }
}
