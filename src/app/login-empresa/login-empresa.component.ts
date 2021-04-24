import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../shared/interfaces/login.interface';
import { JwtService } from '../shared/services/jwt.service';

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

  /* observer = {
    complete: ()) => {
      console.log("Logou")
      localStorage.setItem('token', token);
      this.router.navigateByUrl(`dashboard-empresa/${this.login.cnpj}`)
    },
    error: error => {

    }
   }*/

  constructor(private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
  }

  loginEmpresa(): void {
    this.jwtService.loginEmpresa(this.login).subscribe(res => {
      console.log("Logou")
      localStorage.setItem('token', res.token);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('cnpj', res.cnpj);
      this.router.navigateByUrl(`dashboard-empresa/${this.login.cnpj}`)
    })
  }
}
