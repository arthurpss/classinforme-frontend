import { Component, OnInit } from '@angular/core';
import { AnuncioDetalhes } from '../shared/interfaces/detalhes-anuncio.interface';
import { AnunciosService } from '../shared/services/anuncios.service';
import { EmpresaService } from '../shared/services/empresa.service';
import { ProdutosService } from '../shared/services/produtos.service';

@Component({
  selector: 'app-admin-anuncios',
  templateUrl: './admin-anuncios.component.html',
  styleUrls: ['./admin-anuncios.component.css']
})
export class AdminAnunciosComponent implements OnInit {

  anunciosDetalhes: AnuncioDetalhes[] = [];

  constructor(private anuncioService: AnunciosService, private produtoService: ProdutosService, private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.anuncioService.getAnuncios()
      .then(anuncios => {
        anuncios.forEach(anuncio => {
          this.produtoService.listaProdutoPorId(anuncio.produto_id)
            .then(produto => {
              this.empresaService.getEmpresaPorCnpj(produto.empresa_cnpj)
                .then(empresa => {
                  this.anunciosDetalhes.push({
                    anuncio,
                    produto,
                    empresa
                  });
                })
            })
        })
      });
  }

  private atualizaAnuncios(): void {
    this.anuncioService.getAnuncios().then(anuncios => {
      anuncios.forEach((anuncio, index) => {
        this.anunciosDetalhes[index].anuncio = anuncio
      });
    });
  }

  ativarAnuncio(anuncio_id: string): void {
    this.anuncioService.ativaDesativaAnuncio(anuncio_id, true).subscribe(() => this.atualizaAnuncios());
  }

  desativarAnuncio(anuncio_id: string): void {
    this.anuncioService.ativaDesativaAnuncio(anuncio_id, false).subscribe(() => this.atualizaAnuncios());
  }
}
