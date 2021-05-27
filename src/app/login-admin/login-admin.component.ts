import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../shared/interfaces/login.interface';
import { JwtService } from '../shared/services/jwt.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  login: Login = {
    cnpj: "",
    senha: ""
  };

  constructor(private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
  }

  loginAdmin(): void {
    this.jwtService.login(this.login).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('cnpj', res.cnpj);
      this.router.navigateByUrl(`admin`)
    })
  }
}
