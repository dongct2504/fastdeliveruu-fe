import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemListComponent } from './pages/menu-item-list.component';
import { MenuItemEditComponent } from './pages/menu-item-edit/menu-item-edit.component';

const routes: Routes = [
  { path: '', component: MenuItemListComponent },
  { path: 'add', component: MenuItemEditComponent },
  { path: 'update/:id', component: MenuItemEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuItemsRoutingModule { }
