import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../interfaces/empresa.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {
  constructor(private http: HttpClient) {
  }

  cadastraEmpresa(empresa: Empresa): Observable<any> {
    return this.http.post(`${BASE_URL}/empresa`, empresa, { responseType: "text" });
  }

  getEmpresaPorCnpj(cnpj: string) {
    return this.http.get(`${BASE_URL}/empresa/${cnpj}`);
  }

  getEmpresas(): Promise<any> {
    return this.http.get(`${BASE_URL}/empresas`).toPromise();
  }
}
