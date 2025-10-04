import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ShipperAuthenticateService } from 'src/app/shipper-auth/services/shipper-authenticate.service';
import { ShipperDto } from 'src/app/shared/models/shipper/shipperDto';
import { ShipperOrdersService } from '../../services/shipper-orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shipper-orders',
  templateUrl: './shipper-orders.component.html',
  styleUrls: ['./shipper-orders.component.css']
})
export class ShipperOrdersComponent implements OnInit {
  shipper?: ShipperDto | null;
  orders: any[] = [];
  pagedOrders: any[] = [];
  hasActiveDelivery = false;

  // paging (10 rows per page)
  pageNumber = 1;
  pageSize = 10;
  totalRecords = 0;

  constructor(
    private shipperAuthService: ShipperAuthenticateService,
    private shipperOrdersService: ShipperOrdersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.shipperAuthService.currentShipper$.pipe(take(1)).subscribe(s => {
      this.shipper = s;
      if (!s) {
        const returnUrl = '/shipper/orders';
        this.router.navigate(['/shipper-auth/login'], { queryParams: { returnUrl } });
        return;
      }
      this.loadOrders();
      this.checkActiveDelivery();
    });
  }

  private mapPaymentMethod(pm: number | null | undefined): string {
    if (!pm) return '';
    return pm === 1 ? 'Tiền mặt' : pm === 2 ? 'VNPAY' : pm === 3 ? 'PayPal' : '';
  }

  private mapOrderStatus(os: number | null | undefined): string {
    if (!os) return '';
    switch (os) {
      case 1: return 'Chưa thanh toán';
      case 2: return 'Đang xử lý';
      case 3: return 'Đã hủy';
      case 4: return 'Thanh toán thất bại';
      case 5: return 'Đã thanh toán';
      case 6: return 'Đã giao hàng';
      case 7: return 'Đã hoàn tiền';
      case 8: return 'Thanh toán chậm';
      default: return '';
    }
  }

  private toRad(value: number) {
    return value * Math.PI / 180;
  }

  private calcDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // km, bán kính trái đất
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private tryParseNumber(val: any): number | null {
    const n = typeof val === 'number' ? val : Number(String(val ?? '').trim());
    return isNaN(n) ? null : n;
  }

  private applyPaging() {
    this.totalRecords = this.orders.length;
    const start = (this.pageNumber - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedOrders = this.orders.slice(start, end);
  }

  loadOrders() {
    if (!this.shipper) return;
    const s = this.shipper;
    const sLat = this.tryParseNumber(s.latitude);
    const sLng = this.tryParseNumber(s.longitude);

    this.shipperOrdersService.getAvailableOrders(sLat ?? 0, sLng ?? 0)
      .subscribe({
        next: res => {
          this.orders = res.map(o => {
            const lat2 = this.tryParseNumber(o.latitude);
            const lon2 = this.tryParseNumber(o.longitude);

            let distanceKm: number | null = null;
            if (sLat != null && sLng != null && lat2 != null && lon2 != null) {
              distanceKm = this.calcDistanceKm(sLat, sLng, lat2, lon2);
            }

            return {
              ...o,
              paymentMethodText: this.mapPaymentMethod(o.paymentMethod),
              orderStatusText: this.mapOrderStatus(o.orderStatus),
              distanceKm
            };
          });
          this.pageNumber = 1; // reset page
          this.applyPaging();
        },
        error: _ => {
          // TODO: handle error
        }
      });
  }

  onPageChanged(page: number) {
    if (this.pageNumber !== page) {
      this.pageNumber = page;
      this.applyPaging();
    }
  }

  checkActiveDelivery() {
    // reuse history api then check any DeliveryStatus === 1
    this.shipperOrdersService.getDeliveryHistory().subscribe({
      next: (items: any[]) => {
        this.hasActiveDelivery = items?.some(x => x.deliveryStatus === 1) ?? false;
      },
      error: _ => this.hasActiveDelivery = false
    });
  }

  // Accept an available order
  public accept(o: any) {
    if (this.hasActiveDelivery) {
      this.toastr.error('Bạn đang có đơn hàng đang giao, không thể nhận đơn mới.');
      return; // block when active
    }
    if (!o || !o.id) { return; }
    this.shipperOrdersService.acceptOrder(String(o.id)).subscribe({
      next: _ => {
        this.toastr.success('Đã nhận đơn hàng!');
        this.checkActiveDelivery();
        // Remove accepted order from the list or reload
        this.orders = this.orders.filter(x => x.id !== o.id);
      },
      error: _ => {
        this.toastr.error('Không thể nhận đơn hàng, vui lòng thử lại.');
      }
    });
  }
}
