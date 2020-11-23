import { Component, OnInit } from '@angular/core';
import { Produto } from '../shared/interfaces/produto.interface';
import { ProdutosService } from '../shared/services/produtos.service';
import { CatalogoService } from '../shared/services/catalogo.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  catalogo: object;

  observer = {
    complete: () => {
      this.mostraMensagem(false);
      this.router.navigateByUrl(`dashboard-empresa/${this.produto.empresa_cnpj}`);
    },
    error: error => {
      console.log("Erro no cadastro: ", error);
      this.mostraMensagem(true);
    }
  }

  produto: Produto = {
    categoria: "Adaptador",
    titulo: "",
    descricao: "",
    caminho_img: "",
    caminho_video: "",
    empresa_cnpj: ""
  };

  produtoCadastrado: boolean = false;

  mensagem: string;

  constructor(private route: ActivatedRoute, private produtoService: ProdutosService,
    private catalogoService: CatalogoService, private router: Router) { }

  ngOnInit(): void {
    this.getCnpj().subscribe(cnpj => this.produto.empresa_cnpj = cnpj);
    this.catalogoService.getCatalogo()
      .subscribe(catalogo => this.catalogo = catalogo);
  }

  private getCnpj(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('cnpj'))
    );
  }

  private mostraMensagem(erro: boolean): void {
    if (erro) {
      this.produtoCadastrado = false;
      this.mensagem = "Erro no cadastro";
    } else {
      this.produtoCadastrado = true;
      this.mensagem = "Produto cadastrado";
    }
  }

  cadastraProduto(): void {
    this.produtoService.novoProduto(this.produto)
      .subscribe(this.observer);
  }
}
