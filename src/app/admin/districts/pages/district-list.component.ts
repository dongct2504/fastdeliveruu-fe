import { Component } from '@angular/core';
import { faAdd, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DistrictDto } from 'src/app/shared/models/addresses/districtDto';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { AdminDistrictService } from '../services/admin-district.service';
import { Router } from '@angular/router';
import { PagedList } from 'src/app/shared/models/PagedList';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css']
})
export class DistrictListComponent {
  districts: DistrictDto[] = [];
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
    private districtService: AdminDistrictService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDistricts();
  }

  loadDistricts(): void {
    this.districtService.getAllDistricts(this.params).subscribe((result: PagedList<DistrictDto>) => {
      this.districts = result.items;
      this.totalRecords = result.totalRecords;
      this.itemsPerPage = result.pageSize;
    });
  }

  onPageChanged(event: any) {
    if (this.params.pageNumber !== event) {
      this.params.pageNumber = event;
      this.loadDistricts();
    }
  }

  onSearch() {
    this.params.pageNumber = 1;
    this.loadDistricts();
  }

  editDistrict(id: number) {
    this.router.navigate(['/admin/districts/update', id]);
  }

  deleteDistrict(id: number) {
    if (confirm('Bạn có chắc muốn xóa quận/huyện này?')) {
      this.districtService.deleteDistrict(id).subscribe(() => {
        this.districts = this.districts.filter(d => d.id !== id);
      });
    }
  }
}
