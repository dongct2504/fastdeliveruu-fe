import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipperDeliveriesComponent } from './pages/deliveries/shipper-deliveries.component';
import { ShipperProfileComponent } from './pages/shipper-profile/shipper-profile.component';
import { ShipperOrdersComponent } from './pages/orders/shipper-orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ShipperProfileComponent },
  { path: 'orders', component: ShipperOrdersComponent },
  { path: 'deliveries', component: ShipperDeliveriesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippersRoutingModule { }
