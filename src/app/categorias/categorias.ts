
import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Carrinho } from '../services/carrinho';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class Categorias {
  categoria = '';

  produtos = [
    {
      nome: 'Dipirona 500mg',
      preco: 12.90,
      categoria: 'medicamentos',
      imagem: 'assets/produtos/dipirona.jpg'
    },
    {
      nome: 'Paracetamol 750mg',
      preco: 15.90,
      categoria: 'medicamentos',
      imagem: 'assets/produtos/paracetamol.jpg'
    },
    {
      nome: 'Shampoo',
      preco: 24.90,
      categoria: 'higiene',
      imagem: 'assets/produtos/shampoo.jpg'
    },
    {
      nome: 'Sabonete Líquido',
      preco: 12.90,
      categoria: 'higiene',
      imagem: 'assets/produtos/sabonete.jpg'
    },
    {
      nome: 'Creme Hidratante',
      preco: 29.90,
      categoria: 'beleza',
      imagem: 'assets/produtos/hidratante.jpg'
    },
    {
      nome: 'Protetor Solar',
      preco: 39.90,
      categoria: 'beleza',
      imagem: 'assets/produtos/protetor.jpg'
    },
    {
      nome: 'Vitamina C',
      preco: 19.90,
      categoria: 'vitaminas',
      imagem: 'assets/produtos/vitamina-c.jpg'
    },
    {
      nome: 'Multivitamínico',
      preco: 39.90,
      categoria: 'vitaminas',
      imagem: 'assets/produtos/multivitaminico.jpg'
    }
  ];

  constructor(
    private rota: ActivatedRoute,
    public carrinho: Carrinho,
    private cdr: ChangeDetectorRef
  ) {
    this.rota.url.subscribe(segmentos => {
      this.categoria = segmentos[0]?.path || 'categorias';
    });
  }

  get titulo(): string {
    if (this.categoria === 'categorias') {
      return 'Todas as categorias';
    }

    if (this.categoria === 'ofertas') {
      return 'Ofertas especiais';
    }

    return this.categoria.charAt(0).toUpperCase() +
      this.categoria.slice(1);
  }

  get produtosFiltrados() {
    if (this.categoria === 'categorias') {
      return this.produtos;
    }

    if (this.categoria === 'ofertas') {
      return this.produtos.filter(produto =>
        ['Shampoo', 'Sabonete Líquido', 'Vitamina C']
          .includes(produto.nome)
      );
    }

    return this.produtos.filter(produto =>
      produto.categoria === this.categoria
    );
  }

  adicionar(nome: string, preco: number) {
    this.carrinho.adicionar(nome, preco);
    this.carrinho.abrir();
    this.cdr.detectChanges();
  }
}
