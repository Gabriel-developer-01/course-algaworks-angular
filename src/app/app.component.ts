import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //mensagem de sucesso/erro ou qualq coisa para baixar veja a instrução e o código : https://github.com/akserg/ng2-toasty para ver demonstração aqui: http://akserg.github.io/ng2-webpack-demo/#/toasty
  constructor(
    private toastyConfig: ToastyConfig,
    private route: Router
    ) {
    this.toastyConfig.theme = 'bootstrap';
  }

  navBar() {
    return this.route.url != '/login';
  }
}
