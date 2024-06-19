import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConfirmEmailComponent } from './register/confirm-email/confirm-email.component';

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
