import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCartComponent } from './customer-cart.component';

const routes: Routes = [
  { path: '', component: CustomerCartComponent }
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
export class CustomerCartRoutingModule { }
