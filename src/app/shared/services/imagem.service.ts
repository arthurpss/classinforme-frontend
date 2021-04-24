import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  novaImagem(file: File, produto_id: string) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${BASE_URL}/imagem/${produto_id}`, formData).subscribe();
  }
  
  getImagensByProdutoId(produto_id: string): Promise<Imagem[]> {
    return this.http.get<Imagem[]>(`${BASE_URL}/imagens/${produto_id}`).toPromise();
  }

  getImagemByKey(key: string): Observable<any> {
    return this.http.get(`${BASE_URL}/imagem/${key}`, { responseType: 'blob' });
  }
}
