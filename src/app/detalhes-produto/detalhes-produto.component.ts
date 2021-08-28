import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empresa } from '../shared/interfaces/empresa.interface';
import { Imagem } from '../shared/interfaces/imagem.interface';
import { Produto } from '../shared/interfaces/produto.interface';
import { EmpresaService } from '../shared/services/empresa.service';
import { ImagemService } from '../shared/services/imagem.service';
import { ProdutosService } from '../shared/services/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  imagens: Imagem[];
  produto: Produto;
  empresa: Empresa;

  constructor(private produtosService: ProdutosService, private route: ActivatedRoute, private imagemService: ImagemService, private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.getId().subscribe(id => this.produtosService.listaProdutoPorId(id)
      .then(produto => {
        this.produto = produto;
        // this.getImagens(produto);
        this.empresaService.getEmpresaPorCnpj(produto.empresa_cnpj).then(empresa => this.empresa = empresa);
        this.imagemService.getImagensByProdutoId2(this.produto.produto_id).subscribe(imagens => {
          this.imagens = imagens;
          this.imagens.forEach(imagem => {
            this.imagemService.getImagemByKey(imagem.key)
              .subscribe(data => {
                this.createImageFromBlob(imagem, data);
              })
          });
        })
      }));
  }

  private getId(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('id'))
    );
  }

  getImagens(produto) {
    this.getImagemByProdutoId(produto.produto_id).then(
      imagens => {
        imagens.forEach(imagem => {
          this.imagemService.getImagemByKey(imagem.key).subscribe(data => {
            this.createImageFromBlob(produto, data);
          })
          this.imagens.push(imagem)
        });
      });
  };

  private getImagemByProdutoId(id: string) {
    return this.imagemService.getImagensByProdutoId(id);
  }

  createImageFromBlob(imagem: Imagem, image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      imagem.thumb = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
