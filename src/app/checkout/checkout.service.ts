import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { DeliveryMethodDto } from '../shared/models/orders/deliveryMethodDto';
import { CreateOrderRequest } from '../shared/models/orders/createOrderRequest';
import { PaymentResponse } from '../shared/models/orders/paymentResponse';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getDeliveryMethods() {
    return this.httpClient.get<DeliveryMethodDto[]>(`${this.apiUrl}/delivery-methods`);
  }

  public createCheckoutCashOrder(createOrderRequest: CreateOrderRequest) {
    return this.httpClient.post<PaymentResponse>(`${this.apiUrl}/checkouts/checkout-cash`, createOrderRequest);
  }

  public createCheckoutVnpayOrder(createOrderRequest: CreateOrderRequest) {
    return this.httpClient.post(`${this.apiUrl}/checkouts/checkout-vnpay`, createOrderRequest, {
      responseType: 'text'
    });
  }
}
