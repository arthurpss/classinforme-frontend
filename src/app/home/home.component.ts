import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../shared/services/catalogo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tipoSelecionado: String = "0";
  tipos: object;

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit(): void {
    this.catalogoService.getCatalogo()
    .subscribe(catalogo => this.tipos = catalogo);
  }

  selecionaTipo(tipo: String) {
    this.tipoSelecionado = tipo;
  }

  limpaFiltros() {
    this.tipoSelecionado = "0";
  }
}
