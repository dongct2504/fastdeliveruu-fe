import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout.component';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { CheckoutFailedComponent } from './pages/checkout-failed/checkout-failed.component';

const routes: Routes = [
  { path: '', component: CheckoutComponent },
  { path: 'success', component: CheckoutSuccessComponent },
  { path: 'failed', component: CheckoutFailedComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CheckoutRoutingModule { }
