import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plano } from '../interfaces/plano.interface';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  constructor(private http: HttpClient) { }

  novoPlano(plano: Plano, token: string): Promise<any> {
    const planoBody = {
      preco: plano.preco,
      titulo: plano.titulo,
      descricao: plano.descricao,
      ativo: true
    }
    return this.http.post(`${BASE_URL}/plano`,
      planoBody, {
        headers: new HttpHeaders().append("Authorization", `${token}`),
      responseType: "text"
    }).toPromise();
  }

  listaPlanoPorId(id: number) {
    return this.http.get(`${BASE_URL}/plano/${id}`);
  }

  listaPlanos(): Promise<any> {
    return this.http.get(`${BASE_URL}/planos`).toPromise();
  }

  listaPlanosAtivos(): Promise<Plano[]> {
    return this.http.get<Plano[]>(`${BASE_URL}/planos-ativos`).toPromise();
  }

  atualizaPlano(id: string, plano: Plano) {
    return this.http.patch(`${BASE_URL}/plano/${id}`, plano);
  }
}
