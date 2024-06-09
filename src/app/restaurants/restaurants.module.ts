import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from './restaurants.component';
import { SharedModule } from '../shared/shared.module';
import { RestaurantsRoutingModule } from './restaurants-routing.module';

@NgModule({
  declarations: [
    RestaurantsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    RestaurantsRoutingModule
  ]
})
export class RestaurantsModule { }
