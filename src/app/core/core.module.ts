import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TestErrorsComponent } from './test-errors/test-errors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';

@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorsComponent,
    NotFoundComponent,
    InternalServerErrorComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
