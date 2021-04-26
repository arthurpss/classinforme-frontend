import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtService } from '../shared/services/jwt.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {

  cnpj: string;
  isLogado: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.getCnpj().subscribe(cnpj => this.cnpj = cnpj);
    this.isLogado = this.jwtService.isLoggedIn(this.cnpj);
  }

  private getCnpj(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('cnpj'))
    );
  }

  cadastrarAnuncio(plano: string): void {
    this.router.navigateByUrl(`cadastro-anuncio/${this.cnpj}/${plano}`)
  }
}
