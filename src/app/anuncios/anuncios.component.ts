import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plano } from '../shared/interfaces/plano.interface';
import { JwtService } from '../shared/services/jwt.service';
import { PlanoService } from '../shared/services/plano.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {

  cnpj: string;
  isLogado: boolean;
  planos: Plano[];

  constructor(private router: Router, private route: ActivatedRoute, private jwtService: JwtService, private planoService: PlanoService) { }

  ngOnInit(): void {
    this.getCnpj().subscribe(cnpj => this.cnpj = cnpj);
    this.isLogado = this.jwtService.isLoggedIn(this.cnpj);
    this.planoService.listaPlanosAtivos().then(planos => {
      this.planos = planos
    });
  }

  private getCnpj(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('cnpj'))
    );
  }

  cadastrarAnuncio(plano: number): void {
    this.router.navigateByUrl(`cadastro-anuncio/${this.cnpj}/${plano}`)
  }
}
