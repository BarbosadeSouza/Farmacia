import { Routes } from '@angular/router';
import { Vitrine } from './produtos/vitrine/vitrine';
import { PaginaInicial } from './pagina-inicial/pagina-inicial';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: PaginaInicial, },
  { path: 'produtos', component: Vitrine, },
  { path: 'login', component: Login, }
];
