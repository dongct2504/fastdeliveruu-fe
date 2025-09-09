import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from '../../services/authenticate.service';
import { ResetPasswordRequest } from 'src/app/shared/models/authenticate/resetPasswordRequest';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = {} as FormGroup;
  userId: string = '';
  validationErrors: string[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthenticateService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParamMap.get('userId') || '';

    if (!this.userId) {
      this.toastr.error('Link đặt lại mật khẩu không hợp lệ!');
      this.router.navigate(['/authen/login']);
      return;
    }

    this.initForm();
  }

  initForm() {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.matchPasswords });
  }

  matchPasswords(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { notMatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) return;

    const payload: ResetPasswordRequest = {
      userId: this.userId,
      newPassword: this.resetPasswordForm.value.newPassword
    };

    this.authService.resetPassword(payload).subscribe(() => {
      this.toastr.success('Đặt lại mật khẩu thành công!');
      this.router.navigate(['/authen/login']);
    }, error => {
      this.validationErrors = error;
    });
  }
}
