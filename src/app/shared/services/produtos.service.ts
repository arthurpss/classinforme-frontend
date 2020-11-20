import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../interfaces/produto.interface';

const BASE_URL = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) {
  }

  async novoProduto(produto: Produto) {
    return this.http.post(`${BASE_URL}/novo-produto`, produto);
  }

  listaProdutosPorEmpresa(cnpj: string){
    return this.http.get(`${BASE_URL}/produtos-empresa/${cnpj}`)
  }
}
