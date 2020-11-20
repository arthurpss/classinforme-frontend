import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { HomeComponent } from './home/home.component';
import { LoginEmpresaComponent } from './login-empresa/login-empresa.component';
import { PrimeiroContatoComponent } from './primeiro-contato/primeiro-contato.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'primeiro-contato', component: PrimeiroContatoComponent },
  { path: 'cadastro-empresa', component: CadastroEmpresaComponent },
  { path: 'login', component: LoginEmpresaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
