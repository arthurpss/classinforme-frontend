import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../interfaces/produto.interface';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3333';

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
}
