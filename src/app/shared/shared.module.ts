import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { TruncateWordsPipe } from './pipes/truncate-words.pipe';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagingFooterComponent } from './components/paging-footer/paging-footer.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { RouterModule } from '@angular/router';
import { MenuItemCardComponent } from './components/menu-item-card/menu-item-card.component';

@NgModule({
  declarations: [
    TruncateWordsPipe,
    PagingHeaderComponent,
    PagingFooterComponent,
    SearchFormComponent,
    TextInputComponent,
    OrderTotalsComponent,
    StepperComponent,
    MenuItemCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PaginationModule,
    CdkStepperModule,
    RouterModule
  ],
  exports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    PaginationModule,
    CdkStepperModule,
    RouterModule,

    TruncateWordsPipe,
    PagingHeaderComponent,
    PagingFooterComponent,
    SearchFormComponent,
    TextInputComponent,
    OrderTotalsComponent,
    StepperComponent,
    MenuItemCardComponent
  ]
})
export class SharedModule { }
