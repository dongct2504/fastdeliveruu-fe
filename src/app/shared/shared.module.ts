import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { TruncateWordsPipe } from './pipes/truncate-words.pipe';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagingFooterComponent } from './components/paging-footer/paging-footer.component';

@NgModule({
  declarations: [
    TruncateWordsPipe,
    PagingHeaderComponent,
    PagingFooterComponent
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
    PagingFooterComponent
  ]
})
export class SharedModule { }
