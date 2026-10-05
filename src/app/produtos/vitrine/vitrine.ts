import { Component } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  standalone: true,
  imports: [Produto],
  selector: 'app-vitrine',
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine {}
