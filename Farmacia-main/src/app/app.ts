import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Footer } from './footer/footer';
import { Menu } from './menu/menu';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Footer,
    Menu
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('Farmacia');

  paginaAdmin = false;

  constructor(private router: Router) {

    this.verificarRota();

    this.router.events
      .pipe(
        filter(evento => evento instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.verificarRota();
      });
  }

  verificarRota(): void {
    this.paginaAdmin =
      this.router.url === '/admin' ||
      this.router.url.startsWith('/admin/');
  }
}