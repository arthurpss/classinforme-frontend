import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { DashboardEmpresaComponent } from './dashboard-empresa/dashboard-empresa.component';
import { HomeComponent } from './home/home.component';
import { LoginEmpresaComponent } from './login-empresa/login-empresa.component';
import { PrimeiroContatoComponent } from './primeiro-contato/primeiro-contato.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CadastroAnuncioComponent } from './cadastro-anuncio/cadastro-anuncio.component';
import { AdminComponent } from './admin/admin.component';
import { AdminEmpresasComponent } from './admin-empresas/admin-empresas.component';
import { AdminPropostasComponent } from './admin-propostas/admin-propostas.component';
import { AdminAnunciosComponent } from './admin-anuncios/admin-anuncios.component';
import { AdminEmpresaComponent } from './admin-empresa/admin-empresa.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'primeiro-contato', component: PrimeiroContatoComponent },
  { path: 'cadastro-empresa', component: CadastroEmpresaComponent },
  { path: 'login', component: LoginEmpresaComponent },
  { path: 'dashboard-empresa/:cnpj', component: DashboardEmpresaComponent },
  { path: 'cadastro-produto/:cnpj', component: CadastroProdutoComponent },
  { path: 'cadastro-anuncio/:cnpj/:plano', component: CadastroAnuncioComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      {
        path: 'empresas', component: AdminEmpresasComponent
      },
      {
        path: 'propostas', component: AdminPropostasComponent
      },
      {
        path: 'anuncios', component: AdminAnunciosComponent
      },
      {
        path: 'empresa/:cnpj', component: AdminEmpresaComponent
      }
    ]
  },
  {
    path: 'login-admin', component: LoginAdminComponent
  },
  { path: 'produto/:id', component: DetalhesProdutoComponent },
  { path: 'editar-produto/:id', component: EditarProdutoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
