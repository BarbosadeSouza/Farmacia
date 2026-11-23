
import { Component, ChangeDetectorRef } from '@angular/core';
import { Produto } from '../produto/produto';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  imports: [Produto],
  selector: 'app-vitrine',
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine {

  busca = '';
  produtos: any[] = [];
  erro = false;
  carregando = false;

  constructor(
    private http: HttpClient,
    private rota: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.rota.queryParams.subscribe(params => {
      this.busca = params['busca'] || '';
      this.buscarProdutos();
    });
  }

  buscarProdutos(): void {
    this.produtos = [];
    this.erro = false;
    this.carregando = !!this.busca;

    if (!this.busca) return;

    const termo = this.busca;

    this.http.get<any[]>('http://localhost:3000/produtos')
      .subscribe({
        next: dados => {
          if (termo !== this.busca) return;

          this.produtos = dados.filter(produto =>
            produto.nome.toLowerCase().includes(termo.toLowerCase())
          );

          this.carregando = false;
          this.cdr.detectChanges();
        },
        error: () => {
          if (termo !== this.busca) return;

          this.erro = true;
          this.carregando = false;
          this.cdr.detectChanges();
        }
      });
  }
}