import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../shared/interfaces/empresa.interface';
import { EmailService } from '../shared/services/email.service';
import { EmpresaService } from '../shared/services/empresa.service';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {

  empresaCadastrada: boolean = false;

  empresa: Empresa = {
    cod_sinfor: "",
    cnpj: "",
    senha: "",
    razao_social: "",
    cep: "",
    endereco: "",
    responsavel: "",
    email: "",
    telefone: "",
    responsavel_secundario: "",
    email_secundario: "",
    telefone_secundario: ""
  };

  observer = {
    complete: () => {
      this.mostraMensagem(false);
      this.emailService.emailCadastroEmpresa(this.empresa.razao_social, this.empresa.email).then(() => {
        this.emailService.emailCadastroAdmin(this.empresa.razao_social, this.empresa.telefone).then(() => {
          this.router.navigateByUrl("login")
        })
        }
      );
    },
    error: error => {
      console.log("Erro no cadastro: ", error);
      this.mostraMensagem(true);
    }
  }

  mensagem: string;

  constructor(private empresaService: EmpresaService, private router: Router, private emailService: EmailService) { }

  ngOnInit(): void {
  }

  private mostraMensagem(erro: boolean): void {
    if (erro) {
      this.empresaCadastrada = false;
      this.mensagem = "Erro no cadastro";
    } else {
      this.empresaCadastrada = true;
      this.mensagem = "Empresa cadastrada";
    }
  }

  cadastraEmpresa(): void {
    this.empresaService.cadastraEmpresa(this.empresa)
      .subscribe(this.observer);
  }
}
