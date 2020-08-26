import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { CoreModule } from './navbar/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { HttpModule } from '@angular/http';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    LancamentosModule,
    CoreModule,
    PessoasModule
  ],
  providers: [LancamentoService,PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
