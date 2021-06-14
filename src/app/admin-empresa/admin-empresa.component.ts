import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empresa } from '../shared/interfaces/empresa.interface';
import { Imagem } from '../shared/interfaces/imagem.interface';
import { Produto } from '../shared/interfaces/produto.interface';
import { EmpresaService } from '../shared/services/empresa.service';
import { ImagemService } from '../shared/services/imagem.service';
import { JwtService } from '../shared/services/jwt.service';
import { ProdutosService } from '../shared/services/produtos.service';

@Component({
  selector: 'app-admin-empresa',
  templateUrl: './admin-empresa.component.html',
  styleUrls: ['./admin-empresa.component.css']
})
export class AdminEmpresaComponent implements OnInit {

  isAdmin: boolean;
  cnpj: string;
  produtos: Produto[];
  imagens: Imagem[];
  empresa: Empresa;
  atualizada: boolean;

  constructor(private empresaService: EmpresaService, private produtoService: ProdutosService, private route: ActivatedRoute, private imagemService: ImagemService, private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.getCnpj().subscribe(cnpj => this.cnpj = cnpj);
    this.isAdmin = this.jwtService.isAdmin();
    if (this.isAdmin) {
      this.empresaService.getEmpresaPorCnpj(this.cnpj).then(empresa => {
        this.empresa = empresa
      });
      this.jwtService.getRefreshToken().then(refreshToken => {
        this.jwtService.getToken(refreshToken).subscribe(res => {
          this.produtoService.listaProdutosPorEmpresa(this.cnpj, res.token).then(produtos => {
            this.produtos = produtos;
            this.getImagens();
          });
        });
      })
    }
  }

  private getCnpj(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('cnpj'))
    );
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
          imagens.forEach(imagem => {
            this.imagemService.getImagemByKey(imagem.key).subscribe(data => {
              this.createImageFromBlob(produto, data);
            })
            this.imagens.push(imagem)
          });
        });
    });
  }

  atualizaEmpresa() {
    this.empresaService.atualizaEmpresa(this.cnpj, this.empresa).subscribe(() => {
      this.atualizada = true;
    });
  }

  verDetalhes(id): void {
    this.router.navigateByUrl(`produto/${id}`);
  }
}
