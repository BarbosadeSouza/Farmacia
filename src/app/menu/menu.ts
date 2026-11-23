
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Carrinho } from '../services/carrinho';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Menu {

  constructor(public carrinho: Carrinho) {}

  abrirCarrinho() {
    this.carrinho.abrir();
  }

  fecharCarrinho() {
    this.carrinho.fechar();
  }

  itensMenu = [
    { nome: 'Categorias', rota: '/categorias' },
    { nome: 'Medicamentos', rota: '/medicamentos' },
    { nome: 'Higiene', rota: '/higiene' },
    { nome: 'Beleza', rota: '/beleza' },
    { nome: 'Vitaminas', rota: '/vitaminas' },
    { nome: 'Ofertas', rota: '/ofertas' }
  ];
}
