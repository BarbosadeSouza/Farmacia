import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email: string = '';
  senha: string = '';


  erroSenha: string = '';


  private regexSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


  fazerLogin(): void {
    this.erroSenha = '';

    if (!this.validarSenha(this.senha)) {
      this.erroSenha = 'A senha deve conter no mínimo 8 caracteres, com pelo menos uma letra e um número.';
      return;
    }

    if (this.email && this.senha) {
      console.log('Login realizado para:', this.email);
    }
  }


  validarSenha(senha: string): boolean {
    return this.regexSenha.test(senha);
  }


  esqueciSenha(): void {
    console.log('Redirecionar ou abrir modal de recuperação de senha');
  }


  criarConta(): void {
    console.log('Redirecionar ou abrir modal de registo');
  }
}
