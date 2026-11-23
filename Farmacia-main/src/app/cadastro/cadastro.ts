import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Usuario {
  id?: string;
  nome: string;
  email: string;
  senha: string;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  mensagem = '';
  sucesso = false;
  carregando = false;

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  cadastrar() {
    if (this.carregando) {
      return;
    }

    this.mensagem = '';
    this.sucesso = false;

    const nome = this.nome.trim();
    const email = this.email.trim().toLowerCase();

    if (!nome || !email || !this.senha || !this.confirmarSenha) {
      this.mensagem = 'Preencha todos os campos!';
      return;
    }

    if (this.senha.length < 8) {
      this.mensagem = 'A senha deve ter pelo menos 8 caracteres.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não são iguais!';
      return;
    }

    this.carregando = true;

    this.http.get<Usuario[]>(this.apiUrl, {
      params: { email }
    }).subscribe({
      next: (usuarios) => {
        if (usuarios.length > 0) {
          this.mensagem = 'Este e-mail já está cadastrado!';
          this.carregando = false;
          this.cdr.markForCheck();
          return;
        }

        const usuario: Usuario = {
          nome,
          email,
          senha: this.senha
        };

        this.http.post<Usuario>(this.apiUrl, usuario).subscribe({
          next: () => {
            this.mensagem = 'Cadastro realizado com sucesso!';
            this.sucesso = true;
            this.carregando = false;

            this.nome = '';
            this.email = '';
            this.senha = '';
            this.confirmarSenha = '';

            this.cdr.markForCheck();

            this.router.navigate(['/login']);
          },
          error: () => {
            this.mensagem = 'Erro ao salvar o cadastro. Tente novamente.';
            this.carregando = false;
            this.cdr.markForCheck();
          }
        });
      },
      error: () => {
        this.mensagem = 'Erro ao conectar com a API.';
        this.carregando = false;
        this.cdr.markForCheck();
      }
    });
  }
}