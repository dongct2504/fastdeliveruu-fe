import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { OrderDto } from '../../shared/models/orders/orderDto';
import { PagedList } from '../../shared/models/PagedList';
import { OrderHeaderDetailDto } from '../../shared/models/orders/orderHeaderDto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getOrders(pageNumber = 1, pageSize = 6) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.httpClient.get<PagedList<OrderDto>>(`${this.apiUrl}/orders/get-orders-by-user`, { params });
  }

  public getOrder(id: string) {
    return this.httpClient.get<OrderHeaderDetailDto>(`${this.apiUrl}/orders/${id}`);
  }
}
