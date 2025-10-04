import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ShipperOrdersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // API placeholder: backend endpoint should return orders without a delivery, ordered by distance from lat/long
  getAvailableOrders(lat: number, lng: number) {
    // NOTE: Replace with actual API when available
    return this.http.get<any[]>(`${this.apiUrl}/shipper-orders/available?lat=${lat}&lng=${lng}`);
  }

  getDeliveryHistory() {
    return this.http.get<any[]>(`${this.apiUrl}/shipper-orders/history`);
  }
}
