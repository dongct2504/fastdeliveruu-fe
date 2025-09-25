import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipperProfileComponent } from './pages/shipper-profile/shipper-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ShipperProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippersRoutingModule { }
