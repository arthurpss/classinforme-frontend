import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../shared/interfaces/anuncio.interface';
import { Produto } from '../shared/interfaces/produto.interface';
import { AnunciosService } from '../shared/services/anuncios.service';
import { ProdutosService } from '../shared/services/produtos.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-carousel-produtos',
  templateUrl: './carousel-produtos.component.html',
  styleUrls: ['./carousel-produtos.component.css']
})
export class CarouselProdutosComponent implements OnInit {

  anuncios: any;
  produtosAnunciados: Array<any>

  constructor(private anuncioService: AnunciosService, private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.anuncioService.listaAnunciosAtivos().subscribe(anuncios => {
      map(anuncio => this.produtosAnunciados.push(anuncio))(of(anuncios))
        .subscribe(produtos => console.log(produtos))
      this.anuncios = anuncios;
      console.log(this.anuncios)
    })
    console.log(this.produtosAnunciados);
  }
}
