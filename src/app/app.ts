import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { Menu } from './menu/menu';

@Component({
  imports: [
    RouterOutlet,
    Footer,
    Menu
],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Farmacia');
}
