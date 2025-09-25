import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenticateService } from 'src/app/authenticate/services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authenticateService: AuthenticateService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticateService.currentUser$.pipe(
      map(currentUser => {
        if (currentUser) {
          return true;
        }
        this.router.navigate(['/authen/login'], { queryParams: { returnUrl: state.url } });
        return false;
      })
    );
  }
}
