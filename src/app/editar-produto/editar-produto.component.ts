import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produto } from '../shared/interfaces/produto.interface';
import { CatalogoService } from '../shared/services/catalogo.service';
import { ImagemService } from '../shared/services/imagem.service';
import { JwtService } from '../shared/services/jwt.service';
import { ProdutosService } from '../shared/services/produtos.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto;
  isLogado: boolean;
  catalogo: object;
  mensagem: string;
  produtoAtualizado: boolean;
  files: FileList;
  imagemAdicionada: boolean = false;
  arquivoSelecionado: boolean = false;

  constructor(private route: ActivatedRoute, private produtoService: ProdutosService,
    private catalogoService: CatalogoService, private imagemService: ImagemService, private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.getId().subscribe(id => {
      this.produtoService.listaProdutoPorId(id).then(produto => {
        this.produto = produto
        this.isLogado = this.jwtService.isLoggedIn(produto.empresa_cnpj)
      });
    })
    this.catalogoService.getCatalogo()
      .subscribe(catalogo => this.catalogo = catalogo);
  }

  private getId(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('id'))
    );
  }

  private mostraMensagem(erro: boolean): void {
    if (erro) {
      this.produtoAtualizado = false;
      this.mensagem = "Erro";
    } else {
      this.produtoAtualizado = true;
      this.mensagem = "Produto atualizado";
    }
  }

  observer = {
    complete: () => {
      this.mostraMensagem(false);
      // this.router.navigateByUrl(`dashboard-empresa/${this.produto.empresa_cnpj}`);
    },
    error: error => {
      console.log("Erro na edição: ", error);
      this.mostraMensagem(true);
    }
  }

  editaProduto(): void {
    this.jwtService.getRefreshToken().then(refreshToken => {
      console.log(refreshToken)
      this.jwtService.getToken(refreshToken).subscribe(res => {
        console.log(res)
        this.produtoService.atualizaProduto(this.produto.produto_id, this.produto, res.token)
          .subscribe(this.observer);
      });
    });
  }

  onFileSelected(event): void {
    if (event.target.files) {
      this.files = event.target.files;
      this.arquivoSelecionado = true;
    }
  }

  cadastraImagem(): void {
    let file: File;
    for (let i = 0; i < this.files.length; i++) {
      file = this.files.item(i);
      this.imagemService.novaImagem(file, this.produto.produto_id);
    }
    this.imagemAdicionada = true;
    // this.router.navigateByUrl(`dashboard-empresa/${this.produto.empresa_cnpj}`);
  }

  concluiEdicao(): void {
    this.router.navigateByUrl(`dashboard-empresa/${this.produto.empresa_cnpj}`);
  }
}
