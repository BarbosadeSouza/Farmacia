import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Cadastro } from './cadastro';

describe('Cadastro', () => {
  let component: Cadastro;
  let fixture: ComponentFixture<Cadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cadastro],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Cadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exigir todos os campos', () => {
    component.cadastrar();

    expect(component.mensagem).toBe(
      'Preencha todos os campos!'
    );
  });

  it('deve verificar se as senhas são iguais', () => {
    component.nome = 'Cliente Teste';
    component.email = 'cliente@exemplo.com';
    component.senha = '123456';
    component.confirmarSenha = '654321';

    component.cadastrar();

    expect(component.mensagem).toBe(
      'As senhas não são iguais!'
    );
  });
});
