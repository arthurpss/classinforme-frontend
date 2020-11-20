import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from '../shared/interfaces/empresa.interface';
import { Produto } from '../shared/interfaces/produto.interface';
import { EmpresaService } from '../shared/services/empresa.service';
import { ProdutosService } from '../shared/services/produtos.service';
import { map, switchMap } from 'rxjs/operators';
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


  constructor(private empresaService: EmpresaService, private route: ActivatedRoute, private produtoService: ProdutosService) { }

  ngOnInit(): void {
    this.getCnpj().subscribe(cnpj => this.cnpj = cnpj);
    // this.carregaEmpresa(this.cnpj);
    this.produtoService.listaProdutosPorEmpresa(this.cnpj).subscribe(produtos => {
      console.log(produtos);
      this.produtos = produtos
    });
    console.log(this.cnpj)
    // console.log(this.empresa);
    console.log(this.produtos);
  }

  private getCnpj(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('cnpj'))
    );
  }

  private carregaEmpresa(cnpj: string): void {
    this.empresaService.getEmpresaPorCnpj(cnpj).subscribe(empresa => {
      // this.empresa = empresa
    });
  }

}
