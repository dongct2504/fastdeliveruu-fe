import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modelStareErrors = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modelStareErrors.push(err.error.errors[key]);
                  }
                }
                throw modelStareErrors.flat();
              } else {
                this.toastr.error(err.error.detail, err.error.title);
              }
              break;
            case 401:
              this.router.navigate(['/authen/login']);
              break;
            case 403:
              this.toastr.error('You do not have permission.', 'Forbidden');
              break;
            case 404:
              this.router.navigate(['/not-found']);
              break;
            case 409:
              this.toastr.error(err.error.detail, err.error.title);
              break;
            case 500:
              const extras: NavigationExtras = { state: { error: err.error } }
              this.router.navigate(['/internal-server-error'], extras);
          }
        }

        return throwError(() => err);
      })
    );
  }
}
