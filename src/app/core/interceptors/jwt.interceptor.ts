import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isShipperApi = request.url.includes('/shipper-') || request.url.includes('/shipper/');

    if (isShipperApi) {
      const shipperAuthJson = localStorage.getItem('fastdeliveruu-shipper-authen');
      if (shipperAuthJson) {
        try {
          const shipperAuth = JSON.parse(shipperAuthJson) as { token?: string };
          if (shipperAuth?.token) {
            request = request.clone({
              setHeaders: { Authorization: `Bearer ${shipperAuth.token}` }
            });
          }
        } catch {}
      }
    } else {
      const authenJson = localStorage.getItem('fastdeliveruu-authen');
      if (authenJson) {
        try {
          const authen = JSON.parse(authenJson) as { token?: string };
          if (authen?.token) {
            request = request.clone({
              setHeaders: { Authorization: `Bearer ${authen.token}` }
            });
          }
        } catch {}
      }
    }

    return next.handle(request);
  }
}
