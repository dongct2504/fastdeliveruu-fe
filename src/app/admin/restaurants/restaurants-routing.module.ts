import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './pages/restaurant-list.component';
import { RestaurantEditComponent } from './pages/restaurant-edit/restaurant-edit.component';

const routes: Routes = [
  { path: '', component: RestaurantListComponent },
  { path: 'add', component: RestaurantEditComponent },
  { path: 'update/:id', component: RestaurantEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
