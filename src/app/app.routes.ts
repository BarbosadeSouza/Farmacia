
import { Routes } from '@angular/router';
import { LoginComponent } from './01-Login/login-component';
import { PaginaInicial } from './pagina-inicial/pagina-inicial';
import { Vitrine } from './produtos/vitrine/vitrine';
import { Cadastro } from './cadastro/cadastro';
import { Categorias } from './categorias/categorias';
import { MeusPedidos } from './meus-pedidos/meus-pedidos';

export const routes: Routes = [
  {
    path: '',
    component: PaginaInicial,
    title: 'Página inicial'
  },
  {
    path: 'home',
    component: PaginaInicial,
    title: 'Página inicial'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'produtos',
    component: Vitrine,
    title: 'Vitrine'
  },
  {
    path: 'cadastro',
    component: Cadastro,
    title: 'Cadastro de Clientes'
  },
  {
    path: 'categorias',
    component: Categorias,
    title: 'Categorias'
  },
  {
    path: 'medicamentos',
    component: Categorias,
    title: 'Medicamentos'
  },
  {
    path: 'higiene',
    component: Categorias,
    title: 'Higiene'
  },
  {
    path: 'beleza',
    component: Categorias,
    title: 'Beleza'
  },
  {
    path: 'vitaminas',
    component: Categorias,
    title: 'Vitaminas'
  },
  {
    path: 'ofertas',
    component: Categorias,
    title: 'Ofertas'
  },
  {
    path: 'meus-pedidos',
    component: MeusPedidos,
    title: 'Meus Pedidos'
  }
];
