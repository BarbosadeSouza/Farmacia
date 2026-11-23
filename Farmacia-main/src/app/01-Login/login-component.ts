import { Component, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email: string = '';
  senha: string = '';
  erroSenha: string = '';
  carregando: boolean = false;

  tela: string = 'login';

  emailRecuperacao: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';

  erroRecuperacao: string = '';
  mensagemRecuperacao: string = '';

  private apiUrl = 'http://localhost:3000/usuarios';

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

    this.carregando = true;

    if (email === 'admin' && this.senha === 'admin123') {
      sessionStorage.setItem('adminLogado', 'true');
      this.carregando = false;
      alert('Bem-vindo ao painel administrativo!');
      this.router.navigate(['/admin']);
      return;
    }

    sessionStorage.removeItem('adminLogado');

    this.http.get<Usuario[]>(this.apiUrl, {
      params: { email }
    }).subscribe({

      next: (usuarios) => {

        const usuario = usuarios.find(u =>
          u.email.toLowerCase() === email &&
          u.senha === this.senha
        );

        this.carregando = false;

        if (usuario) {
          const primeiroNome = usuario.nome.trim().split(/\s+/)[0];
          sessionStorage.setItem('usuarioNome', primeiroNome);
          alert('Login realizado com sucesso!');
          this.router.navigate(['/home']);

        } else {
          this.erroSenha = 'E-mail ou senha incorretos.';
        }

        this.cdr.markForCheck();
      },

      error: () => {
        this.erroSenha = 'Erro ao conectar com a API.';
        this.carregando = false;
        this.cdr.markForCheck();
      }

    });
  }

  esqueciSenha(): void {

    this.emailRecuperacao = '';
    this.novaSenha = '';
    this.confirmarNovaSenha = '';

    this.erroRecuperacao = '';
    this.mensagemRecuperacao = '';

    this.tela = 'recuperar';
  }

  continuarRecuperacao(): void {

    this.erroRecuperacao = '';
    this.mensagemRecuperacao = '';

    if (!this.emailRecuperacao.trim()) {
      this.erroRecuperacao = 'Informe seu e-mail.';
      return;
    }

    if (this.carregando) {
      return;
    }

    this.emailRecuperacao =
      this.emailRecuperacao.trim().toLowerCase();

    this.carregando = true;

    this.http.get<Usuario[]>(this.apiUrl).subscribe({

      next: (usuarios) => {

        this.carregando = false;

        const usuario = usuarios.find(u =>
          u.email.toLowerCase() === this.emailRecuperacao
        );

        if (usuario) {
          this.tela = 'novaSenha';

        } else {
          this.erroRecuperacao =
            'Este e-mail não está cadastrado!';
        }

        this.cdr.markForCheck();
      },

      error: () => {
        this.carregando = false;
        this.erroRecuperacao = 'Erro ao conectar com a API.';
        this.cdr.markForCheck();
      }

    });
  }

  salvarNovaSenha(): void {

    this.erroRecuperacao = '';

    if (this.carregando) {
      return;
    }

    if (!this.novaSenha || this.novaSenha.length < 8) {
      this.erroRecuperacao =
        'A senha deve ter pelo menos 8 caracteres.';
      return;
    }

    if (this.novaSenha !== this.confirmarNovaSenha) {
      this.erroRecuperacao = 'As senhas não são iguais.';
      return;
    }

    this.carregando = true;

    this.http.get<Usuario[]>(this.apiUrl).subscribe({

      next: (usuarios) => {

        const usuario = usuarios.find(u =>
          u.email.toLowerCase() === this.emailRecuperacao
        );

        if (usuario && usuario.id) {

          const usuarioAtualizado: Usuario = {
            ...usuario,
            senha: this.novaSenha
          };

          this.http.put<Usuario>(
            `${this.apiUrl}/${usuario.id}`,
            usuarioAtualizado
          ).subscribe({

            next: () => {
              this.finalizarRecuperacao();
            },

            error: () => {
              this.erroRecuperacao =
                'Erro ao conectar com a API.';
              this.carregando = false;
              this.cdr.markForCheck();
            }

          });

        } else {
          this.erroRecuperacao =
            'Este e-mail não está cadastrado!';
          this.carregando = false;
          this.tela = 'recuperar';
          this.cdr.markForCheck();
        }
      },

      error: () => {
        this.erroRecuperacao = 'Erro ao conectar com a API.';
        this.carregando = false;
        this.cdr.markForCheck();
      }

    });
  }

  finalizarRecuperacao(): void {

    this.carregando = false;

    this.tela = 'login';

    this.email = this.emailRecuperacao;
    this.senha = '';

    this.emailRecuperacao = '';
    this.novaSenha = '';
    this.confirmarNovaSenha = '';

    this.erroRecuperacao = '';
    this.mensagemRecuperacao = '';

    alert('Senha atualizada com sucesso!');

    this.cdr.markForCheck();
  }

  voltarLogin(): void {

    this.tela = 'login';

    this.erroRecuperacao = '';
    this.mensagemRecuperacao = '';
  }

  criarConta(): void {
    this.router.navigate(['/cadastro']);
  }
}