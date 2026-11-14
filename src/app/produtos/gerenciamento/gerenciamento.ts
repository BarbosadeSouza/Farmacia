import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProdutoModel } from '../produtos.model';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-gerenciamento',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './gerenciamento.html',
  styleUrl: './gerenciamento.css'
})
export class Gerenciamento implements OnInit {

  produtos: ProdutoModel[] = [];

  produto: ProdutoModel = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: ''
  };

  editando = false;

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        alert('Erro ao carregar os produtos.');
      }
    });
  }

  salvarProduto(): void {

    if (
      !this.produto.nome.trim() ||
      !this.produto.descricao.trim() ||
      !this.produto.categoria.trim() ||
      this.produto.preco <= 0
    ) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    if (this.editando) {
      this.produtoService.alterar(this.produto).subscribe({
        next: () => {
          alert('Produto alterado com sucesso!');
          this.limparFormulario();
          this.listarProdutos();
        },
        error: () => {
          alert('Erro ao alterar produto.');
        }
      });
    } else {
      this.produtoService.cadastrar(this.produto).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.limparFormulario();
          this.listarProdutos();
        },
        error: () => {
          alert('Erro ao cadastrar produto.');
        }
      });
    }
  }

  editarProduto(produto: ProdutoModel): void {
    this.produto = { ...produto };
    this.editando = true;
  }

  excluirProduto(id: string): void {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.excluir(id).subscribe({
        next: () => {
          alert('Produto excluído com sucesso!');
          this.listarProdutos();
        },
        error: () => {
          alert('Erro ao excluir produto.');
        }
      });
    }
  }

  limparFormulario(): void {
    this.produto = {
      nome: '',
      descricao: '',
      preco: 0,
      categoria: ''
    };

    this.editando = false;
  }

  sair(): void {
    sessionStorage.removeItem('adminLogado');
    this.router.navigate(['/']);
  }
}