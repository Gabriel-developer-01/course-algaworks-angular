import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import * as moment from 'moment';
import { Lancamento } from 'app/core/model';

//criando uma interface para tornar obrigatório a descrição como parâmetro quando o método pesquisar for
//chamado ao clicar no botão na view.
export class LancamentoFiltro{
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any>{
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    //preciso converter para string pra ser aceito como parametro
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if(filtro.descricao){
      params.set('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoDe){
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoAte) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers: headers, search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const lancamentos = responseJson.content;

      const resultado = {
        lancamentos: lancamentos,
        total: responseJson.totalElements
      }

      return resultado;
    });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers: headers })
    .toPromise()
    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), {headers: headers})
    .toPromise()
    .then(response => response.json().content);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento>{
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,JSON.stringify(lancamento), {headers: headers})
    .toPromise()
    .then(response => {
      const lancamentoAlterado = response.json() as Lancamento;

      this.converterStringParaDatas([lancamentoAlterado]);

      return lancamento;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento>{
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers: headers })
    .toPromise()
    .then(response => {
      const lancamento = response.json() as Lancamento;

      this.converterStringParaDatas([lancamento]);
      return lancamento;
    });
  }

  private converterStringParaDatas(lancamentos: Lancamento[]){
    for(const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,'YYYY-MM-DD').toDate();

      if(lancamento.dataPagamento){
        lancamento.dataPagamento = moment(lancamento.dataPagamento,'YYYY-MM-DD').toDate();
      }
    }
  }

}
