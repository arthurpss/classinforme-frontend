import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})

export class JwtService {

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, login);
  }

  isLoggedIn(cnpj: string): boolean {
    return localStorage.getItem('token') && localStorage.getItem('cnpj') === cnpj ? true : false
  }

  async getRefreshToken(): Promise<string> {
    return await localStorage.getItem('refreshToken');
  }

  getToken(refreshToken: string): Observable<any> {
    return this.http.post(`${BASE_URL}/token`, {refreshToken});
  }

  isAdmin(): boolean {
    return localStorage.getItem('cnpj') === '0';
  }
}
