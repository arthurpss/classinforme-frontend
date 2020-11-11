import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CarouselProdutosComponent } from './carousel-produtos/carousel-produtos.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    NavbarComponent,
    CadastroEmpresaComponent,
    CadastroProdutoComponent,
    CarouselProdutosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
