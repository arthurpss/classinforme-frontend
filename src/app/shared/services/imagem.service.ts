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

  novaImagem(files: FileList, produto_id: string): Observable<any> {
    // console.log(files);
    const formData = new FormData();
    for( let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      return this.http.post(`${BASE_URL}/nova-imagem/${produto_id}`, formData);
    }
  }
}
