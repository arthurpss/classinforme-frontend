import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../shared/catalogo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-primeiro-contato',
  templateUrl: './primeiro-contato.component.html',
  styleUrls: ['./primeiro-contato.component.css']
})
export class PrimeiroContatoComponent implements OnInit {
  catalogo: any;

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit(): void {
    this.catalogoService.getCatalogo().subscribe(catalogo => this.catalogo = catalogo);
    console.log(this.catalogo);
  }

}
