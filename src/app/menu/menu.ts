import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  itensMenu = [
    {
      nome: 'Categorias',
      rota: '/categorias'
    },
    {
      nome: 'Medicamentos',
      rota: '/medicamentos'
    },
    {
      nome: 'Higiene',
      rota: '/higiene'
    },
    {
      nome: 'Beleza',
      rota: '/beleza'
    },
    {
      nome: 'Vitaminas',
      rota: '/vitaminas'
    },
    {
      nome: 'Ofertas',
      rota: '/ofertas'
    }
  ];
}