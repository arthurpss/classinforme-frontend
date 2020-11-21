import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../shared/interfaces/anuncio.interface';
import { Produto } from '../shared/interfaces/produto.interface';
import { AnunciosService } from '../shared/services/anuncios.service';
import { ProdutosService } from '../shared/services/produtos.service';

@Component({
  selector: 'app-cadastro-anuncio',
  templateUrl: './cadastro-anuncio.component.html',
  styleUrls: ['./cadastro-anuncio.component.css']
})
export class CadastroAnuncioComponent implements OnInit {

  anuncioCadastrado: boolean;
  mensagem: string;

  observer = {
    complete: () => {
      this.mostraMensagem(false);
    },
    error: error => {
      console.log("Erro no cadastro: ", error);
      this.mostraMensagem(true);
    }
  }

  anuncio: Anuncio = {
    produto_id: "",
    plano: "",
    email: "",
    ativo: false
  };

  produto: Produto = {
    titulo: "",
    descricao: "",
    categoria: "",
    empresa_cnpj: "",
    caminho_img: "",
    caminho_video: ""
  }

  produtos: object;

  constructor(private anuncioService: AnunciosService, private produtoService: ProdutosService) { }

  ngOnInit(): void {
    this.produtoService.listaProdutosPorEmpresa(this.produto.empresa_cnpj).subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  private mostraMensagem(erro: boolean): void {
    if (erro) {
      this.anuncioCadastrado = false;
      this.mensagem = "Erro no cadastro";
    } else {
      this.anuncioCadastrado = true;
      this.mensagem = "Anúncio cadastrado";
    }
  }

  cadastraAnuncio(): void {
    this.anuncioService.novoAnuncio(this.anuncio, this.produto)
      .subscribe(this.observer);
  }

}
