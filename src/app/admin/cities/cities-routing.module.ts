import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityEditComponent } from './pages/city-edit/city-edit.component';
import { CityListComponen } from './pages/city-list.component';

const routes: Routes = [
  { path: '', component: CityListComponen },
  { path: 'add', component: CityEditComponent },
  { path: 'update/:id', component: CityEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
