import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ConfirmEmailComponent } from './pages/register/confirm-email/confirm-email.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    AuthenticateRoutingModule
  ]
})
export class AuthenticateModule { }
