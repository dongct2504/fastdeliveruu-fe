import { Component } from '@angular/core';
import { AdminDashboardService } from '../services/admin-dashboard.service';
import { OrderDto } from 'src/app/shared/models/orders/orderDto';
import { OrderStatusEnum } from 'src/app/shared/enums/order-status.enum';
import { TimeRangeEnum } from 'src/app/shared/enums/time-range.enum';
import { OrderParams } from 'src/app/shared/models/orders/orderParams';
import { OrderStatusDescriptions } from 'src/app/shared/constants/order-status-description';
import { PaymentStatusDescriptions } from 'src/app/shared/constants/payment-status-description';
import { PaymentStatusEnum } from 'src/app/shared/enums/payment-status.enum';
import { PaymentMethodsEnum } from 'src/app/shared/enums/payment-methods.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  OrderStatusEnum = OrderStatusEnum;
  PaymentStatusEnum = PaymentStatusEnum;
  paymentMethod = PaymentMethodsEnum;
  TimeRangeEnum = TimeRangeEnum;

  OrderStatusDescriptions = OrderStatusDescriptions;
  PaymentStatusDescriptions = PaymentStatusDescriptions;

  orders: OrderDto[] = [];
  totalOrders = 0;
  totalRevenue = 0;
  totalPaid = 0;
  totalUnpaid = 0;
  totalRecords = 0;
  itemsPerPage = 0;

  orderParams: OrderParams = {
    pageNumber: 1,
    pageSize: 10,
    sort: '',
    search: '',
    timeRange: TimeRangeEnum.Today
  };

  constructor(private dashboardService: AdminDashboardService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    // summary
    this.dashboardService.getOrderSummary(this.orderParams.timeRange).subscribe(summary => {
      this.totalOrders = summary.totalOrders;
      this.totalRevenue = summary.totalRevenue;
      this.totalPaid = summary.totalPaid;
      this.totalUnpaid = summary.totalUnpaid;
    });

    this.dashboardService.getAllOrders(this.orderParams).subscribe((res) => {
      this.orders = res.items;
      this.totalRecords = res.totalRecords;
      this.itemsPerPage = res.pageSize;
    });
  }

  onChangeRange(range: TimeRangeEnum) {
    this.orderParams.pageNumber = 1;
    this.orderParams.timeRange = range;
    this.loadOrders();
  }

  onPageChanged(page: number) {
    if (this.orderParams.pageNumber !== page) {
      this.orderParams.pageNumber = page;
      this.loadOrders();
    }
  }

  getPaymentStatus(order: OrderDto): PaymentStatusEnum {
    if (order.paymentDtos && order.paymentDtos.length > 0) {
      return order.paymentDtos[order.paymentDtos.length - 1].paymentStatus ?? PaymentStatusEnum.Pending;
    }
    return PaymentStatusEnum.Pending;
  }
}
