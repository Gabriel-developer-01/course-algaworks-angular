import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: Http) { }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

    return this.http.get(this.categoriasUrl)
    .toPromise()
    .then(response => response.json());
  }
}
