import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { InternalServerErrorComponent } from './core/internal-server-error/internal-server-error.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'not-found', component: NotFoundComponent
  },
  {
    path: 'internal-server-error', component: InternalServerErrorComponent
  },

  // customer routing
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'authen',
    loadChildren: () => import('./authenticate/authenticate.module').then(mod => mod.AuthenticateModule)
  },
  {
    path: 'shipper-auth',
    loadChildren: () => import('./shipper-auth/shipper-authenticate.module').then(mod => mod.ShipperAuthenticateModule)
  },
  {
    path: 'shipper',
    loadChildren: () => import('./shippers/shippers.module').then(m => m.ShippersModule)
  },
  {
    path: 'menu-items',
    loadChildren: () => import('./menu-items/menu-items.module').then(mod => mod.MenuItemsModule)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./restaurants/restaurants.module').then(mod => mod.RestaurantsModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'carts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./customer-cart/customer-cart.module').then(mod => mod.CustomerCartModule)
  },
  {
    path: 'wishlists',
    canActivate: [AuthGuard],
    loadChildren: () => import('./wishlists/wishlists.module').then(mod => mod.WishlistsModule)
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule)
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule)
  },

  // admin routing

  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
