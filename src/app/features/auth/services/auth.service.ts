import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  register(request: RegisterRequest): Observable<string> {
    return this.http.post<string>(`${environment.apiBaseUrl}/api/auth/register`, {
      email: request.email,
      password: request.password,
      confirmPassword:request.confirmPassword,
    });
  }


  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email); 
  }

  user() : Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
   
    console.log(email);
    if (email ) {
      const user: User = {
        email: email,
    };
      return user;
    }
    return undefined;
  }

  
  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }

}
