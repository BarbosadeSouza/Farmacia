import { Routes } from '@angular/router';
import { LoginComponent } from './01-Login/login-component';
import { PaginaInicial } from './pagina-inicial/pagina-inicial';

export const routes: Routes = [
  { path: '', component:PaginaInicial, title: 'Pagina inicial'},
  { path: 'home', component:PaginaInicial, title: 'Pagina inicial'},
  { path: 'login', component: LoginComponent },
];
