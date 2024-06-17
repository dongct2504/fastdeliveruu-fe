import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @Output() searchValue = new EventEmitter<string>();

  faSearch = faSearch;

  searchForm = {} as FormGroup;

  constructor(private fb: FormBuilder) {
    this.initSearchForm();
  }

  private initSearchForm() {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  onSearchFormSubmit() {
    this.searchValue.emit(this.searchForm.get('searchTerm')?.value);
  }
}
