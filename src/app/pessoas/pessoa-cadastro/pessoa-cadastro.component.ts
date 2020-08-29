import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from 'app/core/model';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent  implements OnInit{

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ){}

  ngOnInit(): void {
  }

  pessoas = new Pessoa();

  salvar(form: FormControl){
    this.pessoas.ativo = true;
    this.pessoaService.adicionar(this.pessoas)
      .then(() => {
        this.toasty.success('Pessoa adicionada com sucesso!!')
        form.reset();
        this.pessoas = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro))
  }
}
