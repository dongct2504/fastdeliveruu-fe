import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ShipperAuthenticateService } from 'src/app/shipper-auth/services/shipper-authenticate.service';
import { ShipperDto } from 'src/app/shared/models/shipper/shipperDto';
import { ShipperOrdersService } from '../../services/shipper-orders.service';

@Component({
  selector: 'app-shipper-deliveries',
  templateUrl: './shipper-deliveries.component.html',
  styleUrls: ['./shipper-deliveries.component.css']
})
export class ShipperDeliveriesComponent implements OnInit {
  shipper?: ShipperDto | null;
  deliveries: any[] = [];

  constructor(
    private shipperAuthService: ShipperAuthenticateService,
    private shipperOrdersService: ShipperOrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shipperAuthService.currentShipper$.pipe(take(1)).subscribe((s: ShipperDto | null) => {
      this.shipper = s;
      if (!s) {
        const returnUrl = '/shipper/deliveries';
        this.router.navigate(['/shipper-auth/login'], { queryParams: { returnUrl } });
        return;
      }
      this.loadHistory();
    });
  }

  public mapDeliveryStatus(os: number | null | undefined): string {
    if (os == null) return '';
    switch (os) {
      case 1: return 'Đang giao hàng';
      case 2: return 'Đã giao';
      default: return '(Không rõ)';
    }
  }

  loadHistory() {
    this.shipperOrdersService.getDeliveryHistory().subscribe({
      next: (res: any[]) => this.deliveries = res,
      error: (_err: unknown) => {}
    });
  }
}
