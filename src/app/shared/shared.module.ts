import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { TruncateWordsPipe } from './pipes/truncate-words.pipe';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagingFooterComponent } from './components/paging-footer/paging-footer.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  declarations: [
    TruncateWordsPipe,
    PagingHeaderComponent,
    PagingFooterComponent,
    SearchFormComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PaginationModule
  ],
  exports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    PaginationModule,

    TruncateWordsPipe,
    PagingHeaderComponent,
    PagingFooterComponent,
    SearchFormComponent,
    TextInputComponent
  ]
})
export class SharedModule { }
