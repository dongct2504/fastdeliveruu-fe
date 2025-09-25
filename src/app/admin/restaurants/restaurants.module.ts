import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantListComponent } from './pages/restaurant-list.component';
import { RestaurantEditComponent } from './pages/restaurant-edit/restaurant-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RestaurantListComponent,
    RestaurantEditComponent
  ],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    SharedModule
  ]
})
export class RestaurantsModule { }
