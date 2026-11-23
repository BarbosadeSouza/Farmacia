
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  constructor(private router: Router) {}

  buscar(termo: string): void {
    this.router.navigate(['/produtos'], {
      queryParams: {
        busca: termo.trim() || null
      }
    });
  }

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
