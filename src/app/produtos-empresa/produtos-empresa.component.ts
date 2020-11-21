import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../shared/interfaces/empresa.interface';
import { ProdutosService } from '../shared/services/produtos.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produtos-empresa',
  templateUrl: './produtos-empresa.component.html',
  styleUrls: ['./produtos-empresa.component.css']
})
export class ProdutosEmpresaComponent implements OnInit {

  produtos: object;
  empresa: Empresa;
  cnpj: string;

  constructor(private route: ActivatedRoute, private produtoService: ProdutosService, private router: Router) { }

  ngOnInit(): void {
    this.getCnpj().subscribe(cnpj => this.cnpj = cnpj);
    this.produtoService.listaProdutosPorEmpresa(this.cnpj).subscribe(produtos => {
      this.produtos = produtos;
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
}