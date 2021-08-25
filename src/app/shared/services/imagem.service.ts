import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Imagem } from '../interfaces/imagem.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(private http: HttpClient) {
  }

  novaImagem(file: File, produto_id: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append("file", file);
    /* return this.http.post<HttpEvent<any>>(`${BASE_URL}/imagem/${produto_id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    }); */

    const req = new HttpRequest('POST', `${BASE_URL}/imagem/${produto_id}`, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  
  getImagensByProdutoId(produto_id: string): Promise<Imagem[]> {
    return this.http.get<Imagem[]>(`${BASE_URL}/imagens/${produto_id}`).toPromise();
  }

  getImagensByProdutoId2(produto_id: string): Observable<Imagem[]> {
    return this.http.get<Imagem[]>(`${BASE_URL}/imagens/${produto_id}`)
  }

  getImagemByKey(key: string): Observable<any> {
    return this.http.get(`${BASE_URL}/imagem/${key}`, { responseType: 'blob' });
  }
  
  deletaImagem(produto_id: string, key: string): Observable<any> {
    return this.http.post(`${BASE_URL}/deleta-imagem/${produto_id}`, {key: key}, {responseType: 'text'})
  }
}
