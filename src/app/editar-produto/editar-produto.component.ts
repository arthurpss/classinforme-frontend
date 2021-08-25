import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Imagem } from '../shared/interfaces/imagem.interface';
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

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  imagens: Imagem[];

  constructor(private route: ActivatedRoute, private produtoService: ProdutosService,
    private catalogoService: CatalogoService, private imagemService: ImagemService, private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.getId().subscribe(id => {
      this.produtoService.listaProdutoPorId(id).then(produto => {
        this.produto = produto
        this.isLogado = this.jwtService.isLoggedIn(produto.empresa_cnpj)
        this.imagemService.getImagensByProdutoId2(this.produto.produto_id).subscribe(imagens => {
          this.imagens = imagens;
          this.imagens.forEach(imagem => {
            this.imagemService.getImagemByKey(imagem.key)
              .subscribe(data => {
                this.createImageFromBlob(imagem, data);
              })
          });
        })
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
    },
    error: error => {
      console.log("Erro na edição: ", error);
      this.mostraMensagem(true);
    }
  }

  editaProduto(): void {
    this.jwtService.getRefreshToken().then(refreshToken => {
      this.jwtService.getToken(refreshToken).subscribe(res => {
        this.produtoService.atualizaProduto(this.produto.produto_id, this.produto, res.token)
          .subscribe(this.observer);
      });
    });
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

  deletaImagem(key: string): void {
    this.imagemService.deletaImagem(this.produto.produto_id, key).subscribe(() => this.ngOnInit());
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

  concluiEdicao(): void {
    this.router.navigateByUrl(`dashboard-empresa/${this.produto.empresa_cnpj}`);
  }
}
