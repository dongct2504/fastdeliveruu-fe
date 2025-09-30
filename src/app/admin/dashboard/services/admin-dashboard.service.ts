import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeRangeEnum } from 'src/app/shared/enums/time-range.enum';
import { OrderDto } from 'src/app/shared/models/orders/orderDto';
import { OrderParams } from 'src/app/shared/models/orders/orderParams';
import { OrderSummaryDto } from 'src/app/shared/models/orders/OrderSummaryDto';
import { PagedList } from 'src/app/shared/models/PagedList';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  baseUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) { }

  getAllOrders(params: OrderParams): Observable<PagedList<OrderDto>> {
    let httpParams = new HttpParams()
      .set('pageNumber', params.pageNumber)
      .set('pageSize', params.pageSize)
      .set('timeRange', params.timeRange);

    if (params.sort) {
      httpParams.append('sort', params.sort);
    }
    if (params.search) {
      httpParams.append('search', params.search);
    }

    return this.http.get<PagedList<OrderDto>>(this.baseUrl, { params: httpParams });
  }

  getOrderSummary(timeRange: TimeRangeEnum): Observable<OrderSummaryDto> {
    const query = `?timeRange=${timeRange}`;
    return this.http.get<OrderSummaryDto>(this.baseUrl + '/get-order-summary' + query);
  }
}
