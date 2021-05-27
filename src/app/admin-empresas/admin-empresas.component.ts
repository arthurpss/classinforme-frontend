import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../shared/interfaces/empresa.interface';
import { EmpresaService } from '../shared/services/empresa.service';

@Component({
  selector: 'app-admin-empresas',
  templateUrl: './admin-empresas.component.html',
  styleUrls: ['./admin-empresas.component.css']
})
export class AdminEmpresasComponent implements OnInit {

  empresas: Empresa[];

  constructor(private empresaService: EmpresaService, private router: Router) { }

  ngOnInit(): void {
    this.empresaService.getEmpresas().then(empresas => {
      this.empresas = empresas
    });
  }

  verEmpresa(cnpj: string): void {
    this.router.navigateByUrl(`admin/empresa/${cnpj}`);
  }
}
