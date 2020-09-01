import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from 'app/core/model';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent  implements OnInit{

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ){}

  ngOnInit(): void {
    this.title.setTitle('Nova pessoa');
    const codigoPessoa = (this.route.snapshot.params[('codigo')]);

    if(codigoPessoa){
      this.carregarPessoas(codigoPessoa);
    }
  }

  pessoas = new Pessoa();

  salvar(form: FormControl){
    if(this.editando){
      this.atualizarPessoa(form);
      this.router.navigate(['/pessoas']);
    }else{
      this.adicionarPessoas(form);
    }
  }

  adicionarPessoas(form: FormControl){
    this.pessoas.ativo = true;
    this.pessoaService.adicionar(this.pessoas)
      .then(() => {
        this.toasty.success('Pessoa adicionada com sucesso!!')
        form.reset();
        this.pessoas = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  atualizarPessoa(form: FormControl){
    this.pessoaService.atualizar(this.pessoas)
    .then(pessoas => {
      this.pessoas = pessoas;
      this.toasty.success('Pessoa alterada com sucesso!!');
      //this.atualizarTitulo();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas(codigo: number){
    this.pessoaService.buscarPorcodigo(codigo)
    .then(pessoas => {
      this.pessoas = pessoas;
      this.atualizarTitulo();
    })
  }

  get editando(){
    return Boolean(this.pessoas.codigo);
  }

  novo(form: FormControl){
    form.reset();

    setTimeout(function(){
      this.pessoas = new Pessoa();
    }.bind(this),1)

    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTitulo(){
    this.title.setTitle('Edição de ' + this.pessoas.nome);
  }
}
