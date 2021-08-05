import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CarouselProdutosComponent } from './carousel-produtos/carousel-produtos.component';
import { RodapeComponent } from './rodape/rodape.component';
import { PrimeiroContatoComponent } from './primeiro-contato/primeiro-contato.component';
import { HomeComponent } from './home/home.component';
import { CatalogoService } from './shared/services/catalogo.service';
import { FormsModule } from '@angular/forms';
import { EmailService } from './shared/services/email.service';
import { LoginEmpresaComponent } from './login-empresa/login-empresa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardEmpresaComponent } from './dashboard-empresa/dashboard-empresa.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { ProdutosEmpresaComponent } from './produtos-empresa/produtos-empresa.component';
import { ProdutosService } from './shared/services/produtos.service';
import { CadastroAnuncioComponent } from './cadastro-anuncio/cadastro-anuncio.component';
import { AdminComponent } from './admin/admin.component';
import { AdminEmpresasComponent } from './admin-empresas/admin-empresas.component';
import { AdminPropostasComponent } from './admin-propostas/admin-propostas.component';
import { AdminAnunciosComponent } from './admin-anuncios/admin-anuncios.component';
import { AdminEmpresaComponent } from './admin-empresa/admin-empresa.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { EditarDadosComponent } from './editar-dados/editar-dados.component';
import { AdminPlanosComponent } from './admin-planos/admin-planos.component';
import { AdminPlanoComponent } from './admin-plano/admin-plano.component';
import { CadastroPlanoComponent } from './cadastro-plano/cadastro-plano.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    NavbarComponent,
    CadastroEmpresaComponent,
    CadastroProdutoComponent,
    CarouselProdutosComponent,
    RodapeComponent,
    PrimeiroContatoComponent,
    HomeComponent,
    LoginEmpresaComponent,
    DashboardEmpresaComponent,
    AnunciosComponent,
    ProdutosEmpresaComponent,
    CadastroAnuncioComponent,
    AdminComponent,
    AdminEmpresasComponent,
    AdminPropostasComponent,
    AdminAnunciosComponent,
    AdminEmpresaComponent,
    LoginAdminComponent,
    DetalhesProdutoComponent,
    EditarProdutoComponent,
    EditarDadosComponent,
    AdminPlanosComponent,
    AdminPlanoComponent,
    CadastroPlanoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    CatalogoService,
    EmailService,
    ProdutosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
