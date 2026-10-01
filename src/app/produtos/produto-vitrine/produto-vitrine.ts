import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-produto-vitrine',
  styleUrl: './produto-vitrine.css',
  templateUrl: './produto-vitrine.html',
})
export class ProdutoVitrine {
  @Input() nome!: string;
  @Input() preco!: number;
  quantidade: number = 0;

  incrementar() {
    this.quantidade++;
  }

  decrementar() {
    if (this.quantidade > 0) {
      this.quantidade--;
    }
  }
}
