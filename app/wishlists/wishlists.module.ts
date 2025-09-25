import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistsRoutingModule } from './wishlists-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WishlistsComponent } from './pages/wishlists.component';


@NgModule({
  declarations: [
    WishlistsComponent
  ],
  imports: [
    CommonModule,
    WishlistsRoutingModule,

    SharedModule
  ]
})
export class WishlistsModule { }
