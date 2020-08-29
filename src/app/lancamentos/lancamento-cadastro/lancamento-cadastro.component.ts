import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriaService } from 'app/categorias/categoria.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit{

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService
    ){}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  tipos = [
    { label: 'Receita', value:'RECEITA' },
    { label: "Despesa", value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [];

  salvar(form: NgForm){
    console.log(form.value);
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

}
