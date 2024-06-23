import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = {} as FormGroup;

  validationErrors: ValidationErrors[] = [];

  constructor(
    private fb: FormBuilder,
    private authenticateService: AuthenticateService,
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
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
      address: [''],
      ward: [''],
      district: [''],
      city: ['']
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
