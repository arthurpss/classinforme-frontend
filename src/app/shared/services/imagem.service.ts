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
    return this.http.post(`${BASE_URL}/nova-imagem/${produto_id}`, formData).subscribe();
  }
}
