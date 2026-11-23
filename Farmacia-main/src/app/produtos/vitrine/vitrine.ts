import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Produto } from '../produto/produto';

interface ProdutoModel {
  id?: string;
  nome: string;
  preco: number;
  categoria: string;
  estoque: number;
}

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [Produto],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css'
})
export class Vitrine implements OnInit {

  produtos: ProdutoModel[] = [];
  produtosFiltrados: ProdutoModel[] = [];

  carregando = true;
  mensagemErro = '';
  tituloCategoria = 'Todos os produtos';

  private apiProdutos = 'http://localhost:3000/produtos';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(evento => evento instanceof NavigationEnd))
      .subscribe(() => {
        this.filtrarProdutos();
      });
  }

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.carregando = true;
    this.mensagemErro = '';

    this.http.get<ProdutoModel[]>(this.apiProdutos).subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.filtrarProdutos();
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar os produtos.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  filtrarProdutos(): void {
    const rota = this.router.url.split('?')[0].replace('/', '');

    const categorias: { [chave: string]: string } = {
      medicamentos: 'Medicamentos',
      higiene: 'Higiene',
      beleza: 'Beleza',
      vitaminas: 'Vitaminas'
    };

    if (categorias[rota]) {
      this.tituloCategoria = categorias[rota];

      this.produtosFiltrados = this.produtos.filter(produto =>
        produto.categoria?.trim().toLowerCase() ===
        categorias[rota].toLowerCase()
      );
    } else if (rota === 'ofertas') {
      this.tituloCategoria = 'Ofertas';
      this.produtosFiltrados = [];
    } else {
      this.tituloCategoria = 'Todos os produtos';
      this.produtosFiltrados = [...this.produtos];
    }

    this.cdr.detectChanges();
  }

  formatarPreco(preco: number): string {
    return Number(preco).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}