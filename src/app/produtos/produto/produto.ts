import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
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

  get isIcon(): boolean {
    return !!this.imageContent && (this.imageContent.startsWith('bi') || this.imageContent.includes('bi-'));
  }

  get iconClass(): string {
    if (!this.imageContent) return '';
    return this.imageContent.startsWith('bi ') ? this.imageContent : `bi ${this.imageContent}`;
  }
}
