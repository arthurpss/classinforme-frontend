import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Anuncio } from '../shared/interfaces/anuncio.interface';
import { Produto } from '../shared/interfaces/produto.interface';
import { AnunciosService } from '../shared/services/anuncios.service';
import { EmailService } from '../shared/services/email.service';
import { JwtService } from '../shared/services/jwt.service';
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
      this.router.navigateByUrl(`dashboard-empresa/${this.produto.empresa_cnpj}`)
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
    produto_id: "",
    titulo: "",
    descricao: "",
    categoria: "",
    thumbnail: undefined,
    empresa_cnpj: ""
  }

  produtos: object;
  isLogado: boolean;

  constructor(private route: ActivatedRoute, private anuncioService: AnunciosService,
    private produtoService: ProdutosService, private router: Router,
    private jwtService: JwtService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.getCnpj().subscribe(cnpj => {
      this.produto.empresa_cnpj = cnpj
      this.isLogado = this.jwtService.isLoggedIn(cnpj);
    });
    if (this.isLogado) {
      this.getPlano().subscribe(plano => this.anuncio.plano = plano);
      this.jwtService.getRefreshToken().then(refreshToken => {
        this.jwtService.getToken(refreshToken).subscribe(res => {
          this.produtoService.listaProdutosPorEmpresa(this.produto.empresa_cnpj, res.token).then(produtos => {
            this.produtos = produtos;
          });
        })
      })
    }
  }

  private getCnpj(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('cnpj'))
    );
  }

  private getPlano(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('plano'))
    );
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
    this.jwtService.getRefreshToken().then(refreshToken => {
      this.jwtService.getToken(refreshToken).subscribe(res => {
        this.anuncioService.novoAnuncio(this.anuncio, this.produto, res.token)
          .then(() => {
            this.emailService.emailAnuncio(this.produto.empresa_cnpj, this.anuncio.email, this.anuncio.plano)
              .then(() => {
                this.mostraMensagem(false);
                this.router.navigateByUrl(`dashboard-empresa/${this.produto.empresa_cnpj}`)
              }).catch(error => {
                console.log("Erro no envio de email: ", error);
                this.mostraMensagem(true);
              })
          }).catch(error => {
            console.log("Erro no cadastro: ", error);
            this.mostraMensagem(true);
          });
      })
    })
  }
}
