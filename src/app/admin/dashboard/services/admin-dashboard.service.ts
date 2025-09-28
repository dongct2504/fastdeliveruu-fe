import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from 'src/app/shared/models/orders/orderDto';
import { PagedList } from 'src/app/shared/models/PagedList';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  baseUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) { }

  getAllOrders(pageNumber = 1, pageSize = 100): Observable<PagedList<OrderDto>> {
    return this.http.get<PagedList<OrderDto>>(
      `${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
