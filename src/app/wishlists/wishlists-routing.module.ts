import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistsComponent } from './wishlists.component';

const routes: Routes = [
  { path: '', component: WishlistsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistsRoutingModule { }
