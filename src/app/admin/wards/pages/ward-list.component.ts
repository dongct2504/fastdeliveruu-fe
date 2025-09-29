import { Component, OnInit } from '@angular/core';
import { WardDto } from 'src/app/shared/models/addresses/wardDto';
import { AdminWardService } from '../services/admin-ward.service';
import { PagedList } from 'src/app/shared/models/PagedList';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { faAdd, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ward-list',
  templateUrl: './ward-list.component.html',
  styleUrls: ['./ward-list.component.css']
})
export class WardListComponent implements OnInit {
  wards: WardDto[] = [];
  totalRecords = 0;
  itemsPerPage = 0;

  params: DefaultParams = {
    pageNumber: 1,
    pageSize: 10,
    sort: '',
    search: ''
  };

  // icons
  faAdd = faAdd;
  faEdit = faEdit;
  faTrash = faTrash;
  faSearch = faSearch;

  constructor(
    private wardService: AdminWardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadWards();
  }

  loadWards(): void {
    this.wardService.getAllWards(this.params).subscribe((result: PagedList<WardDto>) => {
      this.wards = result.items;
      this.totalRecords = result.totalRecords;
      this.itemsPerPage = result.pageSize;
    });
  }

  onPageChanged(event: any) {
    if (this.params.pageNumber !== event) {
      this.params.pageNumber = event;
      this.loadWards();
    }
  }

  onSearch() {
    this.params.pageNumber = 1;
    this.loadWards();
  }

  editWard(id: number) {
    this.router.navigate(['/admin/wards/update', id]);
  }

  deleteWard(id: number) {
    if (confirm('Bạn có chắc muốn xóa phường này?')) {
      this.wardService.deleteWard(id).subscribe(() => {
        this.wards = this.wards.filter(w => w.id !== id);
      });
    }
  }
}
