import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plano } from '../shared/interfaces/plano.interface';
import { JwtService } from '../shared/services/jwt.service';
import { PlanoService } from '../shared/services/plano.service';

@Component({
  selector: 'app-admin-planos',
  templateUrl: './admin-planos.component.html',
  styleUrls: ['./admin-planos.component.css']
})
export class AdminPlanosComponent implements OnInit {

  planos: Plano[];
  isAdmin: boolean;

  constructor(private planoService: PlanoService, private router: Router, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.isAdmin = this.jwtService.isAdmin();
    this.planoService.listaPlanos().then(planos => {
      this.planos = planos
    });
  }

  verPlano(id: number): void {
    this.router.navigateByUrl(`admin/plano/${id}`);
  }

  cadastrarPlano(): void {
    this.router.navigateByUrl('admin/cadastro-plano');
  }
}
