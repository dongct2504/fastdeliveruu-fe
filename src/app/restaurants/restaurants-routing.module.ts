import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './pages/restaurants.component';
import { RestaurantDetailsComponent } from './pages/restaurant-details/restaurant-details.component';

const routes: Routes = [
  { path: '', component: RestaurantsComponent },
  { path: ':id', component: RestaurantDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RestaurantsRoutingModule { }
