import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrimeiroContato } from '../interfaces/primeiro-contato.interface';

const BASE_URL = 'http://localhost:3333';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})


export class EmailService {
  constructor(private http: HttpClient) {
  }

  enviaEmail(contato: PrimeiroContato) {
    return this.http.post(`${BASE_URL}/primeiro-contato/email`, contato, { headers: headers })
      .subscribe();
  }
}
