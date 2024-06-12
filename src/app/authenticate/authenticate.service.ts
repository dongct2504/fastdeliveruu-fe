import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LocalUserDto } from '../shared/models/authenticate/localUserDto';
import { LoginRequest } from '../shared/models/authenticate/loginRequest';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../shared/models/authenticate/registerRequest';
import { AuthenticationResponse } from '../shared/models/authenticate/authenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private apiUrl = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<LocalUserDto | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  public login(loginRequest: LoginRequest) {
    return this.httpClient.post<AuthenticationResponse>(`${this.apiUrl}/user-auth/login`, loginRequest).pipe(
      map(authenResponse => {
        if (authenResponse) {
          localStorage.setItem('fastdeliveruu-authen', JSON.stringify(authenResponse));
          this.currentUserSource.next(authenResponse.localUserDto);
        }
      })
    );
  }

  public register(registerRequest: RegisterRequest) {
    return this.httpClient.post<AuthenticationResponse>(`${this.apiUrl}/user-auth/register`, registerRequest);
  }

  public logout() {
    localStorage.removeItem('fastdeliveruu-authen');
    this.currentUserSource.next(null);
  }

  public loadCurrentUser() {
    const authenJson = localStorage.getItem('fastdeliveruu-authen');
    if (authenJson) {
      const authen: AuthenticationResponse = JSON.parse(authenJson);
      this.currentUserSource.next(authen.localUserDto);
    }
  }

  public isLoggedIn() {
    return this.currentUserSource.value !== null;
  }
}
