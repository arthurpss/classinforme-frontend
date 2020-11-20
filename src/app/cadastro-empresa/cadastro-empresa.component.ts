import { Component, OnInit } from '@angular/core';
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

  constructor(private empresaService: EmpresaService) { }

  ngOnInit(): void {
  }

  private mostraMensagem(): void {
    this.empresaCadastrada = true
  }

  cadastraPessoa(): void {
    this.empresaService.cadastraEmpresa(this.empresa)
      .then(() => this.mostraMensagem());
  }
}
