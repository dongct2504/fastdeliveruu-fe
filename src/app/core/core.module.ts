import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TestErrorsComponent } from './test-errors/test-errors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { SectionHeaderComponent } from './section-header/section-header.component';

@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorsComponent,
    NotFoundComponent,
    InternalServerErrorComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    NgxSpinnerModule,
    BsDropdownModule
  ],
  exports: [
    NgxSpinnerModule,
    BsDropdownModule,

    NavBarComponent,
    SectionHeaderComponent
  ]
})
export class CoreModule { }
