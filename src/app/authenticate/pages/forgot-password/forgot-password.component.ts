import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from 'src/app/authenticate/services/authenticate.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = {} as FormGroup;
  validationErrors: ValidationErrors[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthenticateService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword(email).subscribe(() => {
      this.toastr.success('Vui lòng kiểm tra email để đặt lại mật khẩu!');
      this.forgotPasswordForm.reset();
    }, error => {
      this.validationErrors = error;
    });
  }
}
