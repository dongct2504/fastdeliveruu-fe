import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NavBarComponent,
    FontAwesomeModule
  ]
})
export class CoreModule { }
