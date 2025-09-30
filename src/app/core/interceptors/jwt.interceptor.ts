import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from 'src/app/shared/models/authenticate/authenticationResponse';
import { ShipperAuthenticationResponse } from 'src/app/shared/models/shipper/shipperAuthenticationResponse';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiRequest = request.url.startsWith(environment.apiUrl);

    // Do not append token for auth endpoints
    const isAuthEndpoint = request.url.includes('/authen/') || request.url.includes('/shipper-auth/');

    if (isApiRequest && !isAuthEndpoint) {
      const authenJson = localStorage.getItem('fastdeliveruu-authen');
      const shipperJson = localStorage.getItem('fastdeliveruu-shipper-authen');

      // If calling shipper-specific APIs, prefer shipper token
      const isShipperApi = request.url.includes('/shipper-');

      let bearer: string | null = null;

      if (isShipperApi && shipperJson) {
        const shipper: ShipperAuthenticationResponse = JSON.parse(shipperJson);
        bearer = shipper.token;
      } else if (authenJson) {
        const authen: AuthenticationResponse = JSON.parse(authenJson);
        bearer = authen.token;
      } else if (shipperJson) {
        // fallback: if only shipper token exists
        const shipper: ShipperAuthenticationResponse = JSON.parse(shipperJson);
        bearer = shipper.token;
      }

      if (bearer) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${bearer}` }
        });
      }
    }

    return next.handle(request);
  }
}
