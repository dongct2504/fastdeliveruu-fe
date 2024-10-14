import { Component, OnInit } from '@angular/core';
import { PageSizeConstants } from '../shared/common/pageSizeConstants';
import { OrdersService } from './orders.service';
import { OrderDto } from '../shared/models/orders/orderDto';
import { PaymentMethodsEnum } from '../shared/enums/payment-methods.enum';
import { OrderStatusEnum } from '../shared/enums/order-status.enum';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders?: OrderDto[];
  paymentMethod = PaymentMethodsEnum;
  orderStatus = OrderStatusEnum;

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
