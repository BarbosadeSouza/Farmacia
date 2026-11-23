import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../produtos/produto/produto';
import { Carrinho } from '../services/carrinho';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule, Produto, RouterLink],
  templateUrl: './pagina-inicial.html',
  styleUrl: './pagina-inicial.css'
})
export class PaginaInicial {

  constructor(public servicoCarrinho: Carrinho) {}

  get carrinho() {
    return this.servicoCarrinho.itens;
  }

  get total(): number {
    return this.servicoCarrinho.total;
  }

  adicionarAoCarrinho(nome: string, preco: number) {
    this.servicoCarrinho.adicionar(nome, preco);
  }

  removerItem(index: number) {
    this.servicoCarrinho.remover(index);
  }

  finalizarVenda() {
    this.servicoCarrinho.finalizarCompra();
  }

  get mensagem(): string {
    return this.servicoCarrinho.mensagem;
  }

  get carregando(): boolean {
    return this.servicoCarrinho.carregando;
  }

  get sucesso(): boolean {
    return this.mensagem === 'Compra finalizada com sucesso!';
  }
}