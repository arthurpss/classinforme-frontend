import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../shared/interfaces/empresa.interface';
import { EmpresaService } from '../shared/services/empresa.service';
import { JwtService } from '../shared/services/jwt.service';

@Component({
  selector: 'app-admin-empresas',
  templateUrl: './admin-empresas.component.html',
  styleUrls: ['./admin-empresas.component.css']
})
export class AdminEmpresasComponent implements OnInit {

  empresas: Empresa[];
  isAdmin: boolean;

  constructor(private empresaService: EmpresaService, private router: Router, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.isAdmin = this.jwtService.isAdmin();
    this.empresaService.getEmpresas().then(empresas => {
      this.empresas = empresas
    });
  }

  verEmpresa(cnpj: string): void {
    this.router.navigateByUrl(`admin/empresa/${cnpj}`);
  }
  /* 
    buscaEmpresa(): void {
      // Declare variables
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("filtro");
      filter = input.value.toUpperCase();
      table = document.getElementById("tabela");
      tr = table.getElementsByTagName("tr");
  
      // Loop through all table rows, and hide those who don't match the search query
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }*/
}
