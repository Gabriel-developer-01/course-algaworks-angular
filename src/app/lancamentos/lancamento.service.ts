import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

//criando uma interface para tornar obrigatório a descrição como parâmetro quando o método pesquisar for
//chamado ao clicar no botão na view.
export interface LancamentoFiltro{
  descricao: string;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any>{
    const params = new URLSearchParams
    const headers = new Headers
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if(filtro.descricao){
      params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers: headers, search: params })
    .toPromise()
    .then(response => response.json().content);
  }
}
