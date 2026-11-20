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
  const email = prompt('Digite seu e-mail cadastrado:');

  if (!email) {
    return;
  }

  this.http.get<Usuario[]>(this.apiUrl).subscribe({
    next: (usuarios) => {

      const usuario = usuarios.find(
        u => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (!usuario || !usuario.id) {
        alert('E-mail não cadastrado.');
        return;
      }

      const novaSenha = prompt('Digite sua nova senha:');

      if (!novaSenha || novaSenha.length < 8) {
        alert('A senha deve ter pelo menos 8 caracteres.');
        return;
      }

      const confirmarSenha = prompt('Confirme sua nova senha:');

      if (novaSenha !== confirmarSenha) {
        alert('As senhas não são iguais.');
        return;
      }

      const usuarioAtualizado: Usuario = {
        ...usuario,
        senha: novaSenha
      };

      this.http.put<Usuario>(
        `${this.apiUrl}/${usuario.id}`,
        usuarioAtualizado
      ).subscribe({
        next: () => {
          alert('Senha alterada com sucesso!');
        },
        error: () => {
          alert('Erro ao atualizar a senha.');
        }
      });
    },
    error: () => {
      alert('Erro ao conectar com a API.');
    }
  });
}

  criarConta(): void {
    this.router.navigate(['/cadastro']);
  }
}