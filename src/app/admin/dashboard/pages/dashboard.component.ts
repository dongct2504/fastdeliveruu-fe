import { Component } from '@angular/core';
import { AdminDashboardService } from '../services/admin-dashboard.service';
import { OrderDto } from 'src/app/shared/models/orders/orderDto';
import { OrderStatusEnum } from 'src/app/shared/enums/order-status.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  OrderStatusEnum = OrderStatusEnum;

  orders: OrderDto[] = [];
  totalOrders = 0;
  totalRevenue = 0;
  totalPaid = 0;
  totalUnpaid = 0;

  constructor(private dashboardService: AdminDashboardService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.dashboardService.getAllOrders(1, 200).subscribe((res) => {
      this.orders = res.items;

      const now = new Date();
      const monthOrders = this.orders.filter(o => {
        if (!o.orderDate) return false;
        const orderDate = new Date(o.orderDate);
        return orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear();
      });

      this.totalOrders = monthOrders.length;
      this.totalRevenue = monthOrders.reduce((sum, o) => sum + o.totalAmount, 0);

      this.totalPaid = monthOrders
        .filter(o => o.transactionId !== null && o.transactionId !== '')
        .reduce((sum, o) => sum + o.totalAmount, 0);

      this.totalUnpaid = this.totalRevenue - this.totalPaid;
    });
  }
}
