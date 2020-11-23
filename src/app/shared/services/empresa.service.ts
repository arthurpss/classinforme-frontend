import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../interfaces/empresa.interface';
import { Login } from '../interfaces/login.interface';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {
  constructor(private http: HttpClient) {
  }

  cadastraEmpresa(empresa: Empresa): Observable<any> {
    return this.http.post(`${BASE_URL}/nova-empresa`, empresa, { responseType: "text" });
  }

  loginEmpresa(login: Login) {
    return this.http.post(`${BASE_URL}/login-empresa`, login);
  }

  getEmpresaPorCnpj(cnpj: string) {
    return this.http.get(`${BASE_URL}/lista-empresa/${cnpj}`);
  }
}
