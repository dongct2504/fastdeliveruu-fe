import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './pages/restaurants.component';
import { RestaurantDetailsComponent } from './pages/restaurant-details/restaurant-details.component';

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
