import { Component, OnInit } from '@angular/core';
import { OrderHeaderDetailDto } from 'src/app/shared/models/orders/orderHeaderDto';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderHeader?: OrderHeaderDetailDto;
  subtotal: number = 0;

  constructor(private ordersService: OrdersService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getOrder();
  }

  private getOrder() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.ordersService.getOrder(id).subscribe(orderHeader => {
      this.orderHeader = orderHeader;
      this.calculateTotals();
    });
  }

  private calculateTotals() {
    if (this.orderHeader) {
      this.subtotal = this.orderHeader.orderDetailDtos
        .reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  }
}
