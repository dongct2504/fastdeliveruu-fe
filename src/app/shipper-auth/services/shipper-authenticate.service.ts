import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ShipperDto } from 'src/app/shared/models/shipper/shipperDto';
import { ShipperLoginRequest } from 'src/app/shared/models/shipper/shipperLoginRequest';
import { ShipperRegisterRequest } from 'src/app/shared/models/shipper/shipperRegisterRequest';
import { ShipperAuthenticationResponse } from 'src/app/shared/models/shipper/shipperAuthenticationResponse';

@Injectable({ providedIn: 'root' })
export class ShipperAuthenticateService {
  private apiUrl = environment.apiUrl;

  private currentShipperSource = new BehaviorSubject<ShipperDto | null>(null);
  currentShipper$ = this.currentShipperSource.asObservable();

  private storageKey = 'fastdeliveruu-shipper-authen';

  constructor(private httpClient: HttpClient) {}

  public login(payload: ShipperLoginRequest) {
    return this.httpClient.post<ShipperAuthenticationResponse>(`${this.apiUrl}/shipper-auth/login`, payload).pipe(
      map(res => {
        if (res) {
          localStorage.setItem(this.storageKey, JSON.stringify(res));
          this.currentShipperSource.next(res.shipperDto);
        }
      })
    );
  }

  public register(payload: ShipperRegisterRequest) {
    return this.httpClient.post<ShipperAuthenticationResponse>(`${this.apiUrl}/shipper-auth/register`, payload);
  }

  public logout() {
    localStorage.removeItem(this.storageKey);
    this.currentShipperSource.next(null);
  }

  public loadCurrentShipper() {
    const authenJson = localStorage.getItem(this.storageKey);
    if (authenJson) {
      const authen: ShipperAuthenticationResponse = JSON.parse(authenJson);
      this.currentShipperSource.next(authen.shipperDto);
    }
  }

  public isLoggedInShipper() {
    return this.currentShipperSource.value !== null;
  }
}
