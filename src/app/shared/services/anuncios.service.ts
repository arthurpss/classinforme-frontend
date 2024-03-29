import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  novoAnuncio(anuncio: Anuncio, produto: Produto, token: string): Promise<any> {
    const anuncioBody = {
      produto_id: anuncio.produto_id,
      email: anuncio.email
    }
    return this.http.post(`${BASE_URL}/anuncio/${produto.empresa_cnpj}/${anuncio.plano}`,
      anuncioBody, {
        headers: new HttpHeaders().append("Authorization", `${token}`),
      responseType: "text"
    }).toPromise();
  }

  listaAnunciosPorEmpresa(cnpj: string) {
    return this.http.get(`${BASE_URL}/anuncios/${cnpj}`);
  }

  listaAnunciosPorTipo(tipo: string): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(`${BASE_URL}/anuncios-tipo/${tipo}`);
  }

  getAnuncios(): Promise<any> {
    return this.http.get(`${BASE_URL}/anuncios`).toPromise();
  }

  listaAnunciosAtivos(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(`${BASE_URL}/anuncios-ativos`);
  }

  ativaDesativaAnuncio(anuncio_id: string, ativar: boolean) {
    return this.http.patch(`${BASE_URL}/anuncio/${anuncio_id}`, { "ativar": ativar });
  }
}
