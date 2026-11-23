import { Routes } from '@angular/router';
import { LoginComponent } from './01-Login/login-component';
import { PaginaInicial } from './pagina-inicial/pagina-inicial';
import { Vitrine } from './produtos/vitrine/vitrine';
import { Cadastro } from './cadastro/cadastro';
import { Admin } from './admin/admin';
import { adminGuard } from './admin.guard';

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
    component: LoginComponent,
    title: 'Login'
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
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard],
    title: 'Painel Administrativo - FarmaVida'
  }
];