import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/authenticate/services/authenticate.service';
import { RoleConstants } from 'src/app/shared/constants/role-constants';
import { AppUserDto } from 'src/app/shared/models/authenticate/appUserDto';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  currentUser$?: Observable<AppUserDto | null>;

  get roleConstants() {
    return RoleConstants;
  }

  constructor(
    private authenticateService: AuthenticateService,
  ) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.authenticateService.currentUser$;
  }

  isExistRole(roles: string[], user: AppUserDto | null): boolean {
    if (!user || !user.roles) return false;
    return roles.some(r => user.roles.includes(r));
  }
}
