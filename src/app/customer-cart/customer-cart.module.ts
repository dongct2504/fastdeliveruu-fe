import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCartComponent } from './customer-cart.component';
import { CustomerCartRoutingModule } from './customer-cart-routing.module';

@NgModule({
  declarations: [
    CustomerCartComponent
  ],
  imports: [
    CommonModule,

    CustomerCartRoutingModule
  ]
})
export class CustomerCartModule { }
