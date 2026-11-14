import { Routes } from '@angular/router';
import { LoginComponent } from './01-Login/login-component';
import { PaginaInicial } from './pagina-inicial/pagina-inicial';
import { Vitrine } from './produtos/vitrine/vitrine';
import { Gerenciamento } from './produtos/gerenciamento/gerenciamento';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
  { path: '', component: PaginaInicial },
  { path: 'home', component: PaginaInicial },
  { path: 'login', component: LoginComponent },
  { path: 'produtos', component: Vitrine },
  {
    path: 'gerenciamento',
    component: Gerenciamento,
    canActivate: [adminGuard]
  }
];