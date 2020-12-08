import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;

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
