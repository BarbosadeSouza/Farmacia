import { Component } from '@angular/core';
import { Produto } from '../produtos/produto/produto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [Produto, RouterLink],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css'
})
export class PaginaInicial {

}
