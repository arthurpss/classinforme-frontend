import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../shared/services/catalogo.service';
// import { Observable } from 'rxjs';
import { PrimeiroContato } from '../shared/interfaces/primeiro-contato.interface';
import { EmailService } from '../shared/services/email.service';

@Component({
  selector: 'app-primeiro-contato',
  templateUrl: './primeiro-contato.component.html',
  styleUrls: ['./primeiro-contato.component.css']
})
export class PrimeiroContatoComponent implements OnInit {
  catalogo: object;
  emailEnviado: boolean = false;
  mensagem: string;

  observer = {
    complete: () => {
      this.mostraMensagem(false);
    },
    error: error => {
      console.log("Erro no envio de email: ", error);
      this.mostraMensagem(true);
    }
  }

  contato: PrimeiroContato = {
    razao_social: "",
    email: "",
    tipo_produto: "Adaptador",
    campo_livre: ""
  };

  constructor(private catalogoService: CatalogoService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.catalogoService.getCatalogo()
      .subscribe(catalogo => this.catalogo = catalogo);
  }

  private mostraMensagem(erro: boolean): void {
    if (erro) {
      this.emailEnviado = false;
      this.mensagem = "Erro no envio de email.";
    } else {
      this.emailEnviado = true;
      this.mensagem = "Email enviado";
    }
  }

  enviaEmail(): void {
    this.emailService.enviaEmail(this.contato)
      .subscribe(this.observer);
  }
}
