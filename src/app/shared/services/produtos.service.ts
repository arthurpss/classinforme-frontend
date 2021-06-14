import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from '../interfaces/produto.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})

export class ProdutosService {

  constructor(private http: HttpClient) {
  }

  novoProduto(produto: Produto, token: string): Observable<any> {
    return this.http.post(`${BASE_URL}/produto/${produto.empresa_cnpj}`, produto, { headers: new HttpHeaders().append("Authorization", `${token}`), responseType: "text" });
  }

  listaProdutosPorEmpresa(cnpj: string, token: string): Promise<Produto[]> {
    return this.http.get<Produto[]>(`${BASE_URL}/produtos/${cnpj}`, { headers: new HttpHeaders().append("Authorization", `${token}`) }).toPromise();
  }

  listaProdutoPorId(id: string): Promise<Produto> {
    return this.http.get<Produto>(`${BASE_URL}/produto/${id}`).toPromise();
  }

  atualizaProduto(id: string, produto: Produto, token: string): Observable<any> {
    return this.http.patch(`${BASE_URL}/produto/${id}`, produto, { headers: new HttpHeaders().append("Authorization", `${token}`), responseType: "text" });
  }
}
