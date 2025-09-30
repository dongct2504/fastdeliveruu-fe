import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ShippersRoutingModule } from './shippers-routing.module';
import { ShipperProfileComponent } from './pages/shipper-profile/shipper-profile.component';
import { ShipperOrdersComponent } from './pages/orders/shipper-orders.component';

@NgModule({
  declarations: [
    ShipperProfileComponent,
    ShipperOrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShippersRoutingModule
  ]
})
export class ShippersModule { }
