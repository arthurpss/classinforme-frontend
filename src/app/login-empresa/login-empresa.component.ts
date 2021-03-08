import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../shared/interfaces/login.interface';
import { EmpresaService } from '../shared/services/empresa.service';

@Component({
  selector: 'app-login-empresa',
  templateUrl: './login-empresa.component.html',
  styleUrls: ['./login-empresa.component.css']
})
export class LoginEmpresaComponent implements OnInit {

  login: Login = {
    cnpj: "",
    senha: ""
  };

  observer = {
    complete: () => {
      console.log("Logou")
      this.router.navigateByUrl(`dashboard-empresa/${this.login.cnpj}`)
    },
    error: error => {
      console.log("Erro no login: ", error);
    }
  }

  constructor(private empresaService: EmpresaService, private router: Router) { }

  ngOnInit(): void {
  }

  loginEmpresa(): void {
    this.empresaService.loginEmpresa(this.login).subscribe(this.observer);
  }
}
