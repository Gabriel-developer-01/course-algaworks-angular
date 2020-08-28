import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistro = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private erroHandler: ErrorHandlerService
    ) { }
  ngOnInit(): void {
  }

  pesquisa(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas,
          this.totalRegistro = resultado.total
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisa(pagina)
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any){
    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      this.grid.first === 0 ? this.pesquisa() : this.grid.first = 0;

      this.toasty.success('Pessoa excluída com sucesso!')
    })
    .catch(erro => this.erroHandler.handle(erro));
  }

  mudarStatus(pessoa: any){
    console.log('clicou',pessoa);

    //se a pessoa estiver ativa a variável 'novoStatus' guarda o valor inativo.
    let novoStatus = !pessoa.ativo;
    pessoa.ativo ? pessoa.ativo = false : pessoa.ativo = true;

    this.pessoaService.mudarStatus(pessoa.codigo, pessoa.ativo)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada'

      this.toasty.success(`Pessoa ${acao} com sucesso!`);
    })
    .catch(erro => this.erroHandler.handle(erro))
  }
}
