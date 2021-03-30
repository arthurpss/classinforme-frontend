import { Component, OnInit } from '@angular/core';
import { Produto } from '../shared/interfaces/produto.interface';
import { Imagem } from '../shared/interfaces/imagem.interface';
import { ProdutosService } from '../shared/services/produtos.service';
import { CatalogoService } from '../shared/services/catalogo.service';
import { ImagemService } from '../shared/services/imagem.service';
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
      // this.router.navigateByUrl(`dashboard-empresa/${this.produto.empresa_cnpj}`);
    },
    error: error => {
      console.log("Erro no cadastro: ", error);
      this.mostraMensagem(true);
    }
  }

  produto: Produto = {
    produto_id: "",
    categoria: "Adaptador",
    titulo: "",
    descricao: "",
    empresa_cnpj: ""
  };

  produtoCadastrado: boolean = false;

  mensagem: string;

  id = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  imagem: Imagem = {
    key: "",
    name: "",
    size: undefined,
    url: "",
    produto_id: ""
  };

  files: FileList;

  constructor(private route: ActivatedRoute, private produtoService: ProdutosService,
    private catalogoService: CatalogoService, private router: Router, private imagemService: ImagemService) { }

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
    this.produto.produto_id = this.id();
    this.produtoService.novoProduto(this.produto)
      .subscribe(this.observer);
  }

  onFileSelected(event) {
    if (event.target.files) {
      this.files = event.target.files;
    }
  }

  cadastraImagem(): void {
    let file: File;
    for (let i = 0; i < this.files.length; i++) {
      file = this.files.item(i);
      this.imagemService.novaImagem(file, this.produto.produto_id);
    }
  }
}
