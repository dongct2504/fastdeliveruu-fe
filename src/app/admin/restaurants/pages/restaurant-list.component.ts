import { Component, OnInit } from '@angular/core';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { RestaurantDto } from 'src/app/shared/models/restaurants/restaurantDto';
import { AdminRestaurantService } from '../services/admin-restaurant.service';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: RestaurantDto[] = [];
  totalRecords = 0;
  itemsPerPage = 0;

  defaultParams: DefaultParams = {
    pageNumber: 1,
    pageSize: 10,
    sort: '',
    search: ''
  };

  // icons
  faAdd = faAdd;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private restaurantService: AdminRestaurantService, private router: Router) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants(this.defaultParams).subscribe(result => {
      this.restaurants = result.items;
      this.totalRecords = result.totalRecords;
      this.itemsPerPage = result.pageSize;
    });
  }

  onPageChanged(event: any) {
    if (this.defaultParams.pageNumber !== event) {
      this.defaultParams.pageNumber = event;
      this.loadRestaurants();
    }
  }

  editRestaurant(id: string) {
    this.router.navigate(['/admin/restaurants/update', id]);
  }

  deleteRestaurant(id: string) {
    if (confirm('Bạn có chắc muốn xóa nhà hàng này?')) {
      this.restaurantService.deleteRestaurant(id).subscribe(() => {
        this.restaurants = this.restaurants.filter(r => r.id !== id);
      });
    }
  }
}
