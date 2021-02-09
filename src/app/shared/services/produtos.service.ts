import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  novoProduto(produto: Produto): Observable<any> {
    return this.http.post(`${BASE_URL}/novo-produto/${produto.empresa_cnpj}`, produto, { responseType: "text" });
  }

  listaProdutosPorEmpresa(cnpj: string) {
    return this.http.get(`${BASE_URL}/produtos-empresa/${cnpj}`)
  }

  listaProdutoPorId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${BASE_URL}/produto-id/${id}`);
  }
}
