import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WardListComponent } from './pages/ward-list.component';
import { WardEditComponent } from './pages/ward-edit/ward-edit.component';

const routes: Routes = [
  { path: '', component: WardListComponent },
  { path: 'add', component: WardEditComponent },
  { path: 'update/:id', component: WardEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WardsRoutingModule { }
