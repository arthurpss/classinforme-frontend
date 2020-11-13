import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})

export class CatalogoService {
  constructor(private http: HttpClient) {
  }

  getCatalogo() {
    return this.http.get(`${BASE_URL}/catalogo`);
  }
}
