import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../interfaces/empresa.interface';
import { Login } from '../interfaces/login.interface';

const BASE_URL = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {
  constructor(private http: HttpClient) {
  }

  async cadastraEmpresa(empresa: Empresa) {
    return this.http.post(`${BASE_URL}/nova-empresa`, empresa);
  }

  loginEmpresa(login: Login) {
    return this.http.post(`${BASE_URL}/login-empresa`, login);
  }
}
