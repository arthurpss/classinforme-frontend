import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plano } from '../interfaces/plano.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  constructor(private http: HttpClient) { }

  cadastraPlano(plano: Plano, token: string): Observable<any> {
    /* const planoBody = {
      preco: plano.preco,
      titulo: plano.titulo,
      descricao: plano.descricao,
      ativo: plano.ativo
    } */
    return this.http.post(`${BASE_URL}/plano`,
      plano, {
        headers: new HttpHeaders().append("Authorization", `${token}`),
      responseType: "text"
    });
  }

  listaPlanoPorId(id: string): Promise<Plano> {
    return this.http.get<Plano>(`${BASE_URL}/plano/${id}`).toPromise();
  }

  listaPlanos(): Promise<any> {
    return this.http.get<Plano[]>(`${BASE_URL}/planos`).toPromise();
  }

  listaPlanosAtivos(): Promise<Plano[]> {
    return this.http.get<Plano[]>(`${BASE_URL}/planos-ativos`).toPromise();
  }

  atualizaPlano(id: string, plano: Plano) {
    return this.http.patch(`${BASE_URL}/plano/${id}`, plano, { responseType: "text" });
  }
}
