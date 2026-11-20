import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Produto } from '../produtos/produto/produto';

interface ItemCarrinho {
  nome: string;
  preco: number;
  quantidade: number;
}

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule, Produto, RouterLink],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css'
})
export class PaginaInicial {
  carrinho: ItemCarrinho[] = [];
  mensagem = '';
  sucesso = false;
  carregando = false;

  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  adicionarAoCarrinho(nome: string, preco: number) {
    this.mensagem = '';
    const existente = this.carrinho.find(item => item.nome === nome);

    if (existente) {
      existente.quantidade++;
    } else {
      this.carrinho.push({ nome, preco, quantidade: 1 });
    }
  }

  removerItem(index: number) {
    this.carrinho.splice(index, 1);
  }

  get total(): number {
    return this.carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  }

  finalizarVenda() {
    if (this.carrinho.length === 0 || this.carregando) {
      return;
    }

    this.carregando = true;
    this.mensagem = '';
    this.sucesso = false;

    const pedido = {
      itens: this.carrinho,
      total: Number(this.total.toFixed(2)),
      data: new Date().toLocaleString('pt-BR')
    };

    this.http.post(this.apiUrl, pedido).subscribe({
      next: () => {
        this.carregando = false;
        this.sucesso = true;
        this.mensagem = 'Compra finalizada e registrada com sucesso!';
        this.carrinho = [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.carregando = false;
        this.sucesso = false;
        this.mensagem = 'Erro ao finalizar venda. Verifique se o json-server está rodando na porta 3000.';
        this.cdr.detectChanges();
      }
    });
  }
}