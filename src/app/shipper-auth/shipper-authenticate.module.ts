import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ShipperAuthenticateRoutingModule } from './shipper-authenticate-routing.module';
import { ShipperLoginComponent } from './pages/login/shipper-login.component';
import { ShipperRegisterComponent } from './pages/register/shipper-register.component';
import { ShipperConfirmEmailComponent } from './pages/confirm-email/shipper-confirm-email.component';

@NgModule({
  declarations: [
    ShipperLoginComponent,
    ShipperRegisterComponent,
    ShipperConfirmEmailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShipperAuthenticateRoutingModule,
  ]
})
export class ShipperAuthenticateModule { }
