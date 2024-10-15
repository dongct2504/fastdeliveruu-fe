import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistsRoutingModule } from './wishlists-routing.module';
import { WishlistsComponent } from './wishlists.component';
import { SharedModule } from '../shared/shared.module';


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
