import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrimeiroContato } from '../interfaces/primeiro-contato.interface';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  constructor(private http: HttpClient) {
  }

  enviaEmail(contato: PrimeiroContato) {
    return this.http.post(`${BASE_URL}/primeiro-contato/email`, contato, { responseType: 'text' })
  }

  emailAnuncio(cnpj: string, email: string, plano: string): Promise<any> {
    return this.http.post(`${BASE_URL}/anuncio/email`, {
      cnpj, email, plano
    }, { responseType: 'text' }).toPromise();
  }

  emailCadastroAdmin(razao_social: string, telefone: string): Promise<any> {
    return this.http.post(`${BASE_URL}/cadastro-admin/email`, {
      razao_social, telefone
    }, { responseType: 'text' }).toPromise();
  }

  emailCadastroEmpresa(razao_social: string, email: string): Promise<any> {
    return this.http.post(`${BASE_URL}/cadastro-empresa/email`, {
      razao_social, email
    }, { responseType: 'text' }).toPromise();
  }
}
