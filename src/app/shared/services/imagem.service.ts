import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Imagem } from '../interfaces/imagem.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(private http: HttpClient) {
  }

  novaImagem(file: File, produto_id: string) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${BASE_URL}/nova-imagem/${produto_id}`, formData).subscribe();
  }
  // : Observable<Imagem[]>
  getImagensByProdutoId(produto_id: string): Promise<Imagem[]> {
    return this.http.get<Imagem[]>(`${BASE_URL}/lista-imagens/${produto_id}`).toPromise();
  }

  getImagemByKey(key: string): Observable<any> {
    return this.http.get(`${BASE_URL}/imagem/${key}`, { responseType: 'blob' });
  }
}
