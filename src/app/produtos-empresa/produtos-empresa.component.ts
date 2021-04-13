import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../shared/interfaces/empresa.interface';
import { ProdutosService } from '../shared/services/produtos.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Imagem } from '../shared/interfaces/imagem.interface';
import { ImagemService } from '../shared/services/imagem.service';
import { Produto } from '../shared/interfaces/produto.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-produtos-empresa',
  templateUrl: './produtos-empresa.component.html',
  styleUrls: ['./produtos-empresa.component.css']
})
export class ProdutosEmpresaComponent implements OnInit {

  produtos: Produto[];
  empresa: Empresa;
  cnpj: string;
  imagens: Imagem[] = [];

  constructor(private route: ActivatedRoute, private produtoService: ProdutosService, private router: Router, private imagemService: ImagemService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getCnpj().subscribe(cnpj => this.cnpj = cnpj);
    this.produtoService.listaProdutosPorEmpresa(this.cnpj).then(produtos => {
      this.produtos = produtos;
      this.getImagens();
      // this.imagens.forEach(imagem => {
      //   this.imagemService.getImagemByKey(imagem.key);
      // })
    });
  }

  private getCnpj(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('cnpj'))
    );
  }

  cadastrarProduto(): void {
    this.router.navigateByUrl(`/cadastro-produto/${this.cnpj}`);
  }

  private getImagemByProdutoId(produto_id: string) {
    return this.imagemService.getImagensByProdutoId(produto_id);
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
    this.produtos.forEach(produto => {
      this.getImagemByProdutoId(produto.produto_id).then(
        imagens => {
          imagens.forEach((imagem, i) => {
            console.log(imagem.key);
            this.imagemService.getImagemByKey(imagem.key).subscribe(data => {
              this.createImageFromBlob(produto, data);
            })
            this.imagens.push(imagem)
          });
        });
    });
  }
}