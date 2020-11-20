import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})

export class CatalogoService {
  constructor(private http: HttpClient) {
  }

  getCatalogo(): Observable<object> {
    return this.http.get(`${BASE_URL}/catalogo`);
  }
}
