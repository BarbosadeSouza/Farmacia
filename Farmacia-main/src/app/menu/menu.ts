import { Component } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

primeiroNome = '';

constructor(private router: Router) {
  this.atualizarNome();

  this.router.events
    .pipe(filter(evento => evento instanceof NavigationEnd))
    .subscribe(() => {
      this.atualizarNome();
    });
}

atualizarNome(): void {
  this.primeiroNome = sessionStorage.getItem('usuarioNome') || '';
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