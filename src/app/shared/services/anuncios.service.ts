import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../interfaces/anuncio.interface';
import { Produto } from '../interfaces/produto.interface';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  constructor(private http: HttpClient) { }

  novoAnuncio(anuncio: Anuncio, produto: Produto): Observable<any> {
    const anuncioBody = {
      produto_id: anuncio.produto_id,
      email: anuncio.email
    }
    return this.http.post(`${BASE_URL}/novo-anuncio/${produto.empresa_cnpj}/${anuncio.plano}`, anuncioBody, { responseType: "text" });
  }

  listaAnunciosPorEmpresa(cnpj: string) {
    return this.http.get(`${BASE_URL}/anuncios-empresa/${cnpj}`);
  }

  listaAnuncios() {
    return this.http.get(`${BASE_URL}/anuncios`);
  }

  listaAnunciosAtivos() {
    return this.http.get(`${BASE_URL}/anuncios-ativos`);
  }

  ativaDesativaAnuncio(anuncio_id: string, ativar: boolean) {
    return ativar ? this.http.patch(`${BASE_URL}/${anuncio_id}`, 1) : this.http.patch(`${BASE_URL}/x`, 0);
  }
}
