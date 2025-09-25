import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paging-footer',
  templateUrl: './paging-footer.component.html',
  styleUrls: ['./paging-footer.component.css']
})
export class PagingFooterComponent {
  @Input() itemsPerPage: number = 0;
  @Input() totalRecords: number = 0;

  @Output() pagedChanged = new EventEmitter<number>();

  onPageFooterChanged(event: any) {
    this.pagedChanged.emit(event.page);
  }
}
