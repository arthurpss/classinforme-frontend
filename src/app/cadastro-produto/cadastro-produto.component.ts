import { Component, OnInit } from '@angular/core';
import { Produto } from '../shared/interfaces/produto.interface';
import { Imagem } from '../shared/interfaces/imagem.interface';
import { ProdutosService } from '../shared/services/produtos.service';
import { CatalogoService } from '../shared/services/catalogo.service';
import { ImagemService } from '../shared/services/imagem.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { JwtService } from '../shared/services/jwt.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';


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
    produto_id: "",
    categoria: "Adaptador",
    titulo: "",
    descricao: "",
    thumbnail: undefined,
    empresa_cnpj: "",
    link: "",
    preco: undefined
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
    produto_id: "",
    thumb: undefined
  };

  isLogado: boolean;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(private route: ActivatedRoute, private produtoService: ProdutosService,
    private catalogoService: CatalogoService, private imagemService: ImagemService, private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.getCnpj().subscribe(cnpj => {
      this.produto.empresa_cnpj = cnpj
      this.isLogado = this.jwtService.isLoggedIn(cnpj);
    });
    this.catalogoService.getCatalogo()
      .subscribe(catalogo => this.catalogo = catalogo);
    this.produto.produto_id = this.id();
  }

  private getCnpj(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('cnpj'))
    );
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.imagemService.novaImagem(file, this.produto.produto_id).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Upload realizado: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.imagemService.getImagensByProdutoId2(this.produto.produto_id)
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Erro ao fazer upload: ' + file.name;
          this.message.push(msg);
        });
    }
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
    this.jwtService.getRefreshToken().then(refreshToken => {
      this.jwtService.getToken(refreshToken).subscribe(res => {
        this.produtoService.novoProduto(this.produto, res.token)
          .subscribe(this.observer);
      });
    });
  }
}
