import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm = {} as FormGroup;
  validationErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthenticateService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.matchPasswords });
  }

  matchPasswords(group: FormGroup) {
    const newPass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return newPass === confirm ? null : { notMatch: true };
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) return;

    const formValue = this.changePasswordForm.value;

    this.authService.changePassword({
      currentPassword: formValue.currentPassword,
      newPassword: formValue.newPassword
    }).subscribe(() => {
      this.toastr.success('Đổi mật khẩu thành công!');
      this.router.navigate(['/users']);
    }, error => {
      this.validationErrors = error;
    });
  }
}
