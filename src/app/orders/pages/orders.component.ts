import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { OrderDto } from 'src/app/shared/models/orders/orderDto';
import { PaymentMethodsEnum } from 'src/app/shared/enums/payment-methods.enum';
import { OrderStatusEnum } from 'src/app/shared/enums/order-status.enum';
import { PageSizeConstants } from 'src/app/shared/common/pageSizeConstants';

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
