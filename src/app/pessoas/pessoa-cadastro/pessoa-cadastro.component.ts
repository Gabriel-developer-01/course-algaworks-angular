import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

class Formulario{
nome: string;
logradouro: string;
numero: number;
complemento: string;
bairro: string;
cep: number;
cidade: string;
estado: string;
}

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent  {

  formulario = new Formulario();

  salvar(form: NgForm){
    this.formulario.nome = form.value.nm;
    this.formulario.logradouro = form.value.lgr;
    this.formulario.numero = form.value.num;
    this.formulario.complemento = form.value.comple;
    this.formulario.bairro = form.value.bairro;
    this.formulario.cep = form.value.cep;
    this.formulario.cidade = form.value.cidade;
    this.formulario.estado = form.value.estado;

    console.log(this.formulario);
  }
}
