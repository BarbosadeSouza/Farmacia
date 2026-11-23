
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface ItemCarrinho {
  nome: string;
  preco: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class Carrinho {
  itens: ItemCarrinho[] = [];

  aberto = signal(false);
  carregando = false;
  mensagem = '';

  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  adicionar(nome: string, preco: number) {
    const existente = this.itens.find(item => item.nome === nome);

    if (existente) {
      existente.quantidade++;
    } else {
      this.itens.push({
        nome,
        preco,
        quantidade: 1
      });
    }

    this.mensagem = '';
    this.aberto.set(true);
  }

  remover(index: number) {
    this.itens.splice(index, 1);
  }

  get total(): number {
    return this.itens.reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0
    );
  }

  abrir() {
    this.mensagem = '';
    this.aberto.set(true);
  }

  fechar() {
    this.aberto.set(false);
  }

  limpar() {
    this.itens = [];
  }

  finalizarCompra() {
    if (this.itens.length === 0 || this.carregando) {
      return;
    }

    const usuarioId = sessionStorage.getItem('usuarioId');

    if (!usuarioId) {
      this.fechar();
      this.router.navigate(['/login']);
      return;
    }

    this.carregando = true;
    this.mensagem = '';

    const pedido = {
      usuarioId: usuarioId,
      itens: this.itens.map(item => ({ ...item })),
      total: Number(this.total.toFixed(2)),
      data: new Date().toLocaleString('pt-BR')
    };

    this.http.post(this.apiUrl, pedido).subscribe({
      next: () => {
        this.carregando = false;
        this.mensagem = 'Compra finalizada com sucesso!';
        this.limpar();
      },
      error: () => {
        this.carregando = false;
        this.mensagem = 'Erro ao finalizar compra. Verifique o servidor.';
      }
    });
  }
}
