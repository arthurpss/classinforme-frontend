import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../shared/interfaces/anuncio.interface';
import { Produto } from '../shared/interfaces/produto.interface';
import { AnunciosService } from '../shared/services/anuncios.service';
import { ProdutosService } from '../shared/services/produtos.service';

@Component({
  selector: 'app-carousel-produtos',
  templateUrl: './carousel-produtos.component.html',
  styleUrls: ['./carousel-produtos.component.css']
})
export class CarouselProdutosComponent implements OnInit {

  anuncios: Anuncio[];
  produtosAnunciados: Produto[] = [];

  constructor(private anuncioService: AnunciosService, private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.anuncioService.listaAnunciosAtivos().subscribe(anuncios => {
      this.anuncios = anuncios
      this.anuncios.forEach(anuncio => {
        this.produtosService.listaProdutoPorId(anuncio.produto_id)
          .subscribe(produto => {
            this.produtosAnunciados.push(produto)
          })
      })
    })
  }
}
