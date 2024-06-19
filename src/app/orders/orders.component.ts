import { Component, OnInit } from '@angular/core';
import { PageSizeConstants } from '../shared/common/pageSizeConstants';
import { OrdersService } from './orders.service';
import { OrderDto } from '../shared/models/orders/orderDto';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders?: OrderDto[];

  pageNumber = 1;
  pageSize = PageSizeConstants.pageSize12;
  totalRecords = 0;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    this.ordersService.getOrders(this.pageNumber, this.pageSize).subscribe(pagedList => {
      this.orders = pagedList.items;
      this.totalRecords = pagedList.totalRecords
    })
  }

  onPageChanged(event: any) {
    if (this.pageNumber !== event) {
      this.pageNumber = event;
      this.getOrders();
    }
  }
}
