import { Component, OnInit } from '@angular/core';
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

  constructor(private empresaService: EmpresaService) { }

  ngOnInit(): void {
  }

  loginEmpresa(): void {
    this.empresaService.loginEmpresa(this.login);
  }
}
