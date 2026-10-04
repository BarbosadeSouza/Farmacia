import { Component } from '@angular/core';
import { Produto } from '../produtos/produto/produto';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [Produto],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css'
})
export class PaginaInicial {

}
