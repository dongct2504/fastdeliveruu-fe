import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipperLoginComponent } from './pages/login/shipper-login.component';
import { ShipperRegisterComponent } from './pages/register/shipper-register.component';
import { ShipperConfirmEmailComponent } from './pages/confirm-email/shipper-confirm-email.component';

const routes: Routes = [
  { path: 'login', component: ShipperLoginComponent },
  { path: 'register', component: ShipperRegisterComponent },
  { path: 'confirm-email', component: ShipperConfirmEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipperAuthenticateRoutingModule { }
