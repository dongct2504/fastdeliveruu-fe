import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCartComponent } from './customer-cart.component';
import { CustomerCartRoutingModule } from './customer-cart-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomerCartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    CustomerCartRoutingModule
  ]
})
export class CustomerCartModule { }
