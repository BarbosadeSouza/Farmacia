import { Routes } from '@angular/router';
import { LoginComponent } from './01-Login/login-component';
import { PaginaInicial } from './pagina-inicial/pagina-inicial';
import { Vitrine } from './produtos/vitrine/vitrine';

export const routes: Routes = [
  { path: '', component: PaginaInicial, title: 'Página inicial' },
  { path: 'home', component: PaginaInicial, title: 'Página inicial' },
  { path: 'login', component: LoginComponent },
  { path: 'produtos', component: Vitrine, title: 'Vitrine' },
];
