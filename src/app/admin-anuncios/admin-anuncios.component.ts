import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../shared/interfaces/anuncio.interface';
import { AnunciosService } from '../shared/services/anuncios.service';

@Component({
  selector: 'app-admin-anuncios',
  templateUrl: './admin-anuncios.component.html',
  styleUrls: ['./admin-anuncios.component.css']
})
export class AdminAnunciosComponent implements OnInit {

  anuncios: Anuncio[];

  constructor(private anuncioService: AnunciosService) { }

  ngOnInit(): void {
    this.anuncioService.getAnuncios().then(anuncios => this.anuncios = anuncios);
  }

  private atualizaAnuncios(): void {
    this.anuncioService.getAnuncios().then(anuncios => this.anuncios = anuncios);
  }

  ativarAnuncio(anuncio_id: string): void {
    this.anuncioService.ativaDesativaAnuncio(anuncio_id, true).subscribe(() => this.atualizaAnuncios());
  }

  desativarAnuncio(anuncio_id: string): void {
    this.anuncioService.ativaDesativaAnuncio(anuncio_id, false).subscribe(() => this.atualizaAnuncios());
  }
}
