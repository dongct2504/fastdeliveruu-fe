import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAdd, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CityDto } from 'src/app/shared/models/addresses/cityDto';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { PagedList } from 'src/app/shared/models/PagedList';
import { AdminCityService } from '../services/admin-city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponen implements OnInit {
  cities: CityDto[] = [];
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

  constructor(private cityService: AdminCityService, private router: Router) { }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.cityService.getAllCities(this.params).subscribe((result: PagedList<CityDto>) => {
      this.cities = result.items;
      this.totalRecords = result.totalRecords;
      this.itemsPerPage = result.pageSize;
    });
  }

  onPageChanged(event: any) {
    if (this.params.pageNumber !== event) {
      this.params.pageNumber = event;
      this.loadCities();
    }
  }

  onSearch() {
    this.params.pageNumber = 1;
    this.loadCities();
  }

  editCity(id: number) {
    this.router.navigate(['/admin/cities/update', id]);
  }

  deleteCity(id: number) {
    if (confirm('Bạn có chắc muốn xóa thành phố này?')) {
      this.cityService.deleteCity(id).subscribe(() => {
        this.cities = this.cities.filter(c => c.id !== id);
      });
    }
  }
}
