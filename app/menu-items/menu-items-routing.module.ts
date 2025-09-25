import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemsComponent } from './pages/menu-items.component';
import { MenuItemDetailsComponent } from './pages/menu-item-details/menu-item-details.component';

const routes: Routes = [
  { path: '', component: MenuItemsComponent },
  { path: ':id', component: MenuItemDetailsComponent }
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
export class MenuItemsRoutingModule { }
