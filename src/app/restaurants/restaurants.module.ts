import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from './restaurants.component';
import { SharedModule } from '../shared/shared.module';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';

@NgModule({
  declarations: [
    RestaurantsComponent,
    RestaurantDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    RestaurantsRoutingModule
  ]
})
export class RestaurantsModule { }
