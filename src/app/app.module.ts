import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './core/core.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

  const routes: Routes = [
    { path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
    { path: 'lancamentos', component: LancamentosPesquisaComponent},
    { path: 'lancamentos/novo', component: LancamentoCadastroComponent},
    { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
    { path: 'pessoas', component: PessoasPesquisaComponent},
    { path: 'pessoas/novo', component: PessoaCadastroComponent},
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
    { path: '**', redirectTo: 'pagina-nao-encontrada'}
  ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes),

    LancamentosModule,
    CoreModule,
    PessoasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
