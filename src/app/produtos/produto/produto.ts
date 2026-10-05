import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-produto',
  styleUrl: './produto.css',
  templateUrl: './produto.html',
  standalone: true,
})
export class Produto {
  @Input() imageClass: string = '';
  @Input() imageContent: string = '';
  @Input() tag: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() price: string = '';
  @Input() buttonLink: string = '';
  @Input() buttonLabel: string = 'Adicionar à cesta';
}
