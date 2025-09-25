import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ConfirmEmailComponent } from './pages/register/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ConfirmEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    AuthenticateRoutingModule
  ]
})
export class AuthenticateModule { }
