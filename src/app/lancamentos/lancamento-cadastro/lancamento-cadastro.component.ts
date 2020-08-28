import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'app/categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit{

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
    ){}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  tipos = [
    { label: 'Receita', value:'RECEITA' },
    { label: "Despesa", value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [
    { label: 'João da Silva', value: 1 },
    { label: 'Sebastião Souza', value: 2 },
    { label: 'Maria Abadia', value: 3 }
  ];

  salvar(form: NgForm){
    console.log(form.value);
  }

  carregarCategorias(){
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => ({label: c.nome, value: c.codigo}))
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
