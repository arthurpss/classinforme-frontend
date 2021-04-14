import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../shared/interfaces/empresa.interface';
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
    cidade: "",
    bairro: "",
    endereco: "",
    filiado: false
  };

  observer = {
    complete: () => {
      this.mostraMensagem(false);
      this.router.navigateByUrl(`dashboard-empresa/${this.empresa.cnpj}`)
    },
    error: error => {
      console.log("Erro no cadastro: ", error);
      this.mostraMensagem(true);
    }
  }

  mensagem: string;

  constructor(private empresaService: EmpresaService, private router: Router) { }

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

  cadsatraEmpresa(): void {
    this.empresaService.cadastraEmpresa(this.empresa)
      .subscribe(this.observer);
  }
}
