import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictListComponent } from './pages/district-list.component';
import { DistrictEditComponent } from './pages/district-edit/district-edit.component';

const routes: Routes = [
  { path: '', component: DistrictListComponent },
  { path: 'add', component: DistrictEditComponent },
  { path: 'update/:id', component: DistrictEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictsRoutingModule { }
