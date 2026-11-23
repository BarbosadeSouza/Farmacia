
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  senha = '';
  erroSenha = '';
  carregando = false;

  private apiUrl = 'http://localhost:3000/usuarios';
  private regexSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  fazerLogin(): void {
    this.erroSenha = '';

    if (this.carregando) {
      return;
    }

    const email = this.email.trim().toLowerCase();

    if (!email || !this.senha) {
      this.erroSenha = 'Preencha o e-mail e a senha.';
      return;
    }

    // Acesso administrativo para demonstração acadêmica.
    if (email === 'admin' && this.senha === 'admin123') {
      sessionStorage.removeItem('usuarioId');
      sessionStorage.removeItem('usuarioNome');
      sessionStorage.setItem('adminLogado', 'true');

      this.router.navigate(['/admin']);
      return;
    }

    sessionStorage.removeItem('adminLogado');

    if (!this.regexSenha.test(this.senha)) {
      this.erroSenha = 'E-mail ou senha inválidos.';
      return;
    }

    this.carregando = true;

    this.http.get<Usuario[]>(this.apiUrl, {
      params: { email }
    }).subscribe({
      next: (usuarios) => {
        this.carregando = false;

        const usuario = usuarios.find(
          u => u.email.toLowerCase() === email && u.senha === this.senha
        );

        if (usuario) {
          sessionStorage.setItem('usuarioId', String(usuario.id));
          sessionStorage.setItem('usuarioNome', usuario.nome);

          this.router.navigate(['/home']);
        } else {
          this.erroSenha = 'E-mail ou senha inválidos.';
        }

        this.cdr.markForCheck();
      },
      error: () => {
        this.carregando = false;
        this.erroSenha = 'Erro ao conectar com o servidor.';
        this.cdr.markForCheck();
      }
    });
  }

  esqueciSenha(): void {
    this.router.navigate(['/recuperar-senha']);
  }

  criarConta(): void {
    this.router.navigate(['/cadastro']);
  }
}
