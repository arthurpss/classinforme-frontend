import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../shared/interfaces/anuncio.interface';
import { Imagem } from '../shared/interfaces/imagem.interface';
import { Produto } from '../shared/interfaces/produto.interface';
import { AnunciosService } from '../shared/services/anuncios.service';
import { ImagemService } from '../shared/services/imagem.service';
import { ProdutosService } from '../shared/services/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  anuncios: Anuncio[];
  produtosAnunciados: Produto[] = [];
  imagens: Imagem[] = [];

  constructor(private anuncioService: AnunciosService, private produtosService: ProdutosService, private imagemService: ImagemService) { }


  ngOnInit(): void {
    this.anuncioService.listaAnunciosAtivos().subscribe(anuncios => {
      this.anuncios = anuncios
      this.anuncios.forEach(anuncio => {
        this.produtosService.listaProdutoPorId(anuncio.produto_id)
          .subscribe(produto => {
            this.produtosAnunciados.push(produto)
            this.getImagens();
          })
      })
    })
  }

  createImageFromBlob(produto: Produto, image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      produto.thumbnail = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImagens() {
    this.produtosAnunciados.forEach(produto => {
      this.getImagemByProdutoId(produto.produto_id).then(
        imagens => {
          imagens.forEach(imagem => {
            this.imagemService.getImagemByKey(imagem.key).subscribe(data => {
              this.createImageFromBlob(produto, data);
            })
            this.imagens.push(imagem)
          });
        });
    });
  }

  private getImagemByProdutoId(produto_id: string) {
    return this.imagemService.getImagensByProdutoId(produto_id);
  }
}
