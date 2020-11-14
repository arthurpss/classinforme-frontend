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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CatalogoService,
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
