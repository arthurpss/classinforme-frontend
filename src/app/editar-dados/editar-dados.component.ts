import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empresa } from '../shared/interfaces/empresa.interface';
import { EmpresaService } from '../shared/services/empresa.service';
import { JwtService } from '../shared/services/jwt.service';

@Component({
  selector: 'app-editar-dados',
  templateUrl: './editar-dados.component.html',
  styleUrls: ['./editar-dados.component.css']
})
export class EditarDadosComponent implements OnInit {

  isLogado: boolean;
  cnpj: string;
  empresa: Empresa;
  atualizada: boolean;

  constructor(private empresaService: EmpresaService, private jwtService: JwtService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCnpj().subscribe(cnpj => {
      this.cnpj = cnpj
      this.isLogado = this.jwtService.isLoggedIn(cnpj);
    });
    if (this.isLogado) {
      this.empresaService.getEmpresaPorCnpj(this.cnpj).then(empresa => {
        this.empresa = empresa
      });
    }
  }

  private getCnpj(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('cnpj'))
    );
  }

  atualizaEmpresa() {
    this.empresaService.atualizaEmpresa(this.cnpj, this.empresa).subscribe(() => {
      this.atualizada = true;
      this.router.navigateByUrl(`dashboard-empresa/${this.cnpj}`);
    });
  }
}
