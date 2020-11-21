import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../interfaces/anuncio.interface';
import { Produto } from '../interfaces/produto.interface';

const BASE_URL = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  constructor(private http: HttpClient) { }

  novoAnuncio(anuncio: Anuncio, produto: Produto): Observable<any> {
    return this.http.post(`${BASE_URL}/novo-anuncio/${produto.empresa_cnpj}`, anuncio, { responseType: "text" });
  }

  listaAnunciosPorEmpresa(cnpj: string) {
    return this.http.get(`${BASE_URL}/anuncios-empresa/${cnpj}`);
  }
}
