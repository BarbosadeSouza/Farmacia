import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login-component';
import {} from 'jasmine';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar a função fazerLogin ao enviar o formulário com dados válidos (no mínimo 8 caracteres com letra e número)', () => {
    spyOn(console, 'log');

    component.email = 'teste@farmacia.com';
    component.senha = 'senha12345'; 
    component.fazerLogin();

    expect(console.log).toHaveBeenCalledWith('Login realizado para:', 'teste@farmacia.com');
    expect(component.erroSenha).toBe('');
  });

  it('deve exibir mensagem de erro se a senha for inválida ao chamar fazerLogin', () => {
    spyOn(console, 'log');

    component.email = 'teste@farmacia.com';
    component.senha = '123456'; 
    component.fazerLogin();

    expect(console.log).not.toHaveBeenCalled();
    expect(component.erroSenha).toBeTruthy();
  });

  it('deve chamar a função esqueciSenha ao clicar no link de recuperação de senha', () => {
    spyOn(console, 'log');

    component.esqueciSenha();

    expect(console.log).toHaveBeenCalledWith('Redirecionar ou abrir modal de recuperação de senha');
  });

  it('deve chamar a função criarConta ao clicar no botão de criar conta', () => {
    spyOn(console, 'log');

    component.criarConta();

    expect(console.log).toHaveBeenCalledWith('Redirecionar ou abrir modal de registo');
  });
});