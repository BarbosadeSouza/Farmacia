import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';
import { ProdutoModel } from '../produtos/produtos.model';

interface Produto extends ProdutoModel {
  id: string;
  icone: string;
  destaque: string;
}

interface ItemCarrinho extends Produto {
  quantidade: number;
}

interface Pedido {
  numero: number;
  data: string;
  itens: string;
  total: number;
}

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css'
})
export class PaginaInicial implements OnInit {

  busca: string = '';
  categoriaSelecionada: string = 'Todas';

  produtos: Produto[] = [];
  carrinho: ItemCarrinho[] = [];
  pedidos: Pedido[] = [];

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (dados) => {
        this.produtos = dados.map((produto, index) => ({
          ...produto,
          id: produto.id ?? String(index),
          icone: this.obterIcone(produto.categoria),
          destaque: 'Disponível'
        }));

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
      }
    });
  }

  obterIcone(categoria: string): string {
    switch (categoria.toLowerCase()) {
      case 'medicamentos':
        return '💊';
      case 'higiene':
        return '🧴';
      case 'beleza':
        return '✨';
      case 'vitaminas':
        return '💚';
      default:
        return '🛍️';
    }
  }

  get produtosFiltrados(): Produto[] {
    return this.produtos.filter(produto => {

      const correspondeCategoria =
        this.categoriaSelecionada === 'Todas' ||
        produto.categoria.toLowerCase() ===
        this.categoriaSelecionada.toLowerCase();

      const texto = (
        produto.nome + ' ' + produto.descricao
      ).toLowerCase();

      const correspondeBusca =
        texto.includes(this.busca.toLowerCase().trim());

      return correspondeCategoria && correspondeBusca;
    });
  }

  filtrarCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.busca = '';
  }

  limparFiltros(): void {
    this.categoriaSelecionada = 'Todas';
    this.busca = '';
  }

  irParaProdutos(): void {
    this.categoriaSelecionada = 'Todas';

    document.getElementById('produtos')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  adicionarCarrinho(produto: Produto): void {
    const item = this.carrinho.find(
      produtoCarrinho => produtoCarrinho.id === produto.id
    );

    if (item) {
      item.quantidade++;
    } else {
      this.carrinho.push({
        ...produto,
        quantidade: 1
      });
    }

    alert(produto.nome + ' adicionado à cesta!');
  }

  removerCarrinho(id: string): void {
    const item = this.carrinho.find(
      produto => produto.id === id
    );

    if (!item) {
      return;
    }

    item.quantidade--;

    if (item.quantidade <= 0) {
      this.carrinho = this.carrinho.filter(
        produto => produto.id !== id
      );
    }
  }

  get quantidadeCarrinho(): number {
    return this.carrinho.reduce(
      (total, item) => total + item.quantidade,
      0
    );
  }

  get totalCarrinho(): number {
    return this.carrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }

  finalizarPedido(): void {
    if (this.carrinho.length === 0) {
      alert('Sua cesta está vazia.');
      return;
    }

    const novoPedido: Pedido = {
      numero: this.pedidos.length + 1,
      data: new Date().toLocaleString('pt-BR'),
      itens: this.carrinho.map(
        item => item.nome + ' (' + item.quantidade + ')'
      ).join(', '),
      total: this.totalCarrinho
    };

    this.pedidos.push(novoPedido);

    this.carrinho = [];

    alert('Pedido realizado com sucesso!');

    document.getElementById('pedidos')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
