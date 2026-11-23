import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Produto {
  id?: string;
  nome: string;
  preco: number;
  categoria: string;
  estoque: number;
}

interface Usuario {
  id?: string;
  nome: string;
  email: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  produtos: Produto[] = [];
  usuarios: Usuario[] = [];

  produto: Produto = {
    nome: '',
    preco: 0,
    categoria: '',
    estoque: 0
  };

  editando: boolean = false;
  carregando: boolean = false;
  mensagemErro: string = '';
  excluindoUsuario: boolean = false;

  private apiProdutos = 'http://localhost:3000/produtos';
  private apiUsuarios = 'http://localhost:3000/usuarios';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listarProdutos();
    this.listarUsuarios();
  }

  listarProdutos(): void {
    this.http.get<Produto[]>(this.apiProdutos).subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.mensagemErro = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar produtos.';
        this.cdr.detectChanges();
      }
    });
  }

  listarUsuarios(): void {
    this.http.get<Usuario[]>(this.apiUsuarios).subscribe({
      next: (dados) => {
        this.usuarios = dados;
        this.mensagemErro = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar usu├írios.';
        this.cdr.detectChanges();
      }
    });
  }

  salvarProduto(): void {

    if (this.carregando) {
      return;
    }

    if (
      !this.produto.nome.trim() ||
      !this.produto.categoria.trim() ||
      !Number.isFinite(this.produto.preco) ||
      this.produto.preco <= 0 ||
      !Number.isInteger(this.produto.estoque) ||
      this.produto.estoque < 0
    ) {
      alert('Preencha os dados do produto corretamente.');
      return;
    }

    this.carregando = true;

    if (this.editando && this.produto.id) {

      this.http.put<Produto>(
        `${this.apiProdutos}/${this.produto.id}`,
        this.produto
      ).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.limparFormulario();
          this.listarProdutos();
          this.carregando = false;
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Erro ao atualizar produto.');
          this.carregando = false;
          this.cdr.detectChanges();
        }
      });

    } else {

      this.http.post<Produto>(
        this.apiProdutos,
        this.produto
      ).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.limparFormulario();
          this.listarProdutos();
          this.carregando = false;
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Erro ao cadastrar produto.');
          this.carregando = false;
          this.cdr.detectChanges();
        }
      });

    }
  }

  editarProduto(produto: Produto): void {
    this.produto = { ...produto };
    this.editando = true;
  }

  excluirProduto(id: string | undefined): void {

    if (!id) {
      return;
    }

    if (!confirm('Deseja realmente excluir este produto?')) {
      return;
    }

    this.http.delete(`${this.apiProdutos}/${id}`).subscribe({
      next: () => {
        alert('Produto exclu├¡do com sucesso!');
        this.listarProdutos();
      },
      error: () => {
        alert('Erro ao excluir produto.');
      }
    });
  }

  excluirUsuario(usuario: Usuario): void {

    if (!usuario.id || this.excluindoUsuario) {
      return;
    }

    const confirmar = confirm(
      `Deseja realmente excluir o usu├írio "${usuario.nome}"?\n\n` +
      'Essa a├º├úo n├úo poder├í ser desfeita.'
    );

    if (!confirmar) {
      return;
    }

    this.excluindoUsuario = true;

    this.http.delete(
      `${this.apiUsuarios}/${usuario.id}`
    ).subscribe({
      next: () => {
        alert('Usu├írio exclu├¡do com sucesso!');
        this.excluindoUsuario = false;
        this.listarUsuarios();
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Erro ao excluir usu├írio.');
        this.excluindoUsuario = false;
        this.cdr.detectChanges();
      }
    });
  }

  limparFormulario(): void {
    this.produto = {
      nome: '',
      preco: 0,
      categoria: '',
      estoque: 0
    };

    this.editando = false;
  }

  totalProdutos(): number {
    return this.produtos.length;
  }

  totalUsuarios(): number {
    return this.usuarios.length;
  }

  sair(): void {
    sessionStorage.removeItem('adminLogado');
    this.router.navigate(['/login']);
  }
}
