import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

import { CategoriaService } from 'app/categorias/categoria.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Lancamento } from 'app/core/model';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit{

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ){}

  ngOnInit() {
    this.title.setTitle('Novo lançamento');

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if(codigoLancamento){
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: "Despesa", value: 'DESPESA' }
  ];

  get editando() {
    return Boolean(this.lancamento.codigo)
  }

  salvar(form: FormControl) {
    if (this.editando){
      this.atualizarLancamento(form);
    }else{
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl){
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
      this.toasty.success('Lançamento adicionado com suceesso!!');
      // form.reset();
     // this.lancamento = new Lancamento();
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  /*buscarPorCodigo(codigo: number) {
    return this.lancamentoService.buscarPorCodigo(codigo)
      .then(result => {
        this.lancamento = result;
      });

  }*/

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.toasty.success('Lançamento alterado com sucesso!!! ');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  /*private converterStringsParaDatas(lancamentos: Lancamento[]) {
    moment().format('ddMMYYYY');
    moment().format()
  }*/

  carregarLancamento(codigo: number){
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias(){
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => ({label: c.nome, value: c.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas(){
    return this.pessoaService.listarTodas()
    .then(pessoa => {
      this.pessoas = pessoa.map(p => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl){
    form.reset();

    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }
}
