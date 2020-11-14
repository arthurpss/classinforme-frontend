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
  catalogo: any;

  contato: PrimeiroContato = {
    razao_social: "",
    email: "",
    tipo_produto: ""
  };

  constructor(private catalogoService: CatalogoService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.catalogoService.getCatalogo().subscribe(catalogo => this.catalogo = catalogo);
  }

  enviaEmail(): void {
    this.emailService.enviaEmail(this.contato);
  }
}
