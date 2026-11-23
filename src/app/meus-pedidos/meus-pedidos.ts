
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

interface ItemPedido {
  nome: string;
  preco: number;
  quantidade: number;
}

interface Pedido {
  id?: string | number;
  usuarioId: string;
  itens: ItemPedido[];
  total: number;
  data: string;
}

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css'
})
export class MeusPedidos implements OnInit {
  pedidos: Pedido[] = [];
  carregando = true;
  erro = '';

  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    const usuarioId = sessionStorage.getItem('usuarioId');

    if (!usuarioId) {
      this.carregando = false;
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<Pedido[]>(this.apiUrl).subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos.filter(
          pedido => String(pedido.usuarioId) === usuarioId
        );

        this.carregando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erro = 'Erro ao carregar os pedidos.';
        this.carregando = false;
        this.cdr.markForCheck();
      }
    });
  }
}
