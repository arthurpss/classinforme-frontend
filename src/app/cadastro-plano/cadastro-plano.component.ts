import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plano } from '../shared/interfaces/plano.interface';
import { JwtService } from '../shared/services/jwt.service';
import { PlanoService } from '../shared/services/plano.service';

@Component({
  selector: 'app-cadastro-plano',
  templateUrl: './cadastro-plano.component.html',
  styleUrls: ['./cadastro-plano.component.css']
})
export class CadastroPlanoComponent implements OnInit {

  planoCadastrado: boolean = false;
  mensagem: string;
  plano: Plano = {
    plano_id: undefined,
    titulo: "",
    descricao: "",
    preco: 0,
    tipo: 0,
    ativo: false
  };
  isAdmin: boolean;

  observer = {
    complete: () => {
      this.mostraMensagem(false);
      this.router.navigateByUrl("admin/planos")
    },
    error: error => {
      console.log("Erro no cadastro: ", error);
      this.mostraMensagem(true);
    }
  }

  constructor(private planoService: PlanoService, private router: Router, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.isAdmin = this.jwtService.isAdmin();
  }

  cadastraPlano(): void {
    this.jwtService.getRefreshToken().then(refreshToken => {
      this.jwtService.getToken(refreshToken).subscribe(res => {
        this.planoService.cadastraPlano(this.plano, res.token)
          .subscribe(this.observer);
      });
    });
  }

  private mostraMensagem(erro: boolean): void {
    if (erro) {
      this.planoCadastrado = false;
      this.mensagem = "Erro no cadastro";
    } else {
      this.planoCadastrado = true;
      this.mensagem = "Empresa cadastrada";
    }
  }
}
