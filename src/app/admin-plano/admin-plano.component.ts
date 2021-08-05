import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plano } from '../shared/interfaces/plano.interface';
import { JwtService } from '../shared/services/jwt.service';
import { PlanoService } from '../shared/services/plano.service';

@Component({
  selector: 'app-admin-plano',
  templateUrl: './admin-plano.component.html',
  styleUrls: ['./admin-plano.component.css']
})
export class AdminPlanoComponent implements OnInit {

  isAdmin: boolean;
  planoId: string;
  plano: Plano;
  atualizado: boolean;

  constructor(private jwtService: JwtService, private route: ActivatedRoute, private planoService: PlanoService, private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.jwtService.isAdmin();
    this.getPlanoId().subscribe(id => this.planoId = id);
    if (this.isAdmin) {
      this.planoService.listaPlanoPorId(this.planoId).then(plano => {
        this.plano = plano
      });
    }
  }

  private getPlanoId(): Observable<string> {
    return this.route.paramMap.pipe(
      map(params => params.get('id'))
    );
  }

  atualizaPlano() {
    this.planoService.atualizaPlano(this.planoId, this.plano).subscribe(() => {
      this.atualizado = true;
      this.router.navigateByUrl('admin/planos')
    });
  }
}
