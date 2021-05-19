import { Component, OnInit } from '@angular/core';
import { Empresa } from '../shared/interfaces/empresa.interface';
import { EmpresaService } from '../shared/services/empresa.service';

@Component({
  selector: 'app-admin-empresas',
  templateUrl: './admin-empresas.component.html',
  styleUrls: ['./admin-empresas.component.css']
})
export class AdminEmpresasComponent implements OnInit {

  empresas: Empresa[];

  constructor(private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.empresaService.getEmpresas().then(empresas => {
      console.log(empresas)
      this.empresas = empresas});
    console.log(this.empresas)
  }

}
