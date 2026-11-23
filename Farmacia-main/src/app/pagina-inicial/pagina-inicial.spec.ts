import { TestBed } from '@angular/core/testing';
import { PaginaInicial } from './pagina-inicial';

describe('PaginaInicial', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [PaginaInicial]
    }).compileComponents();

  });

  it('deve criar o componente', () => {

    const fixture = TestBed.createComponent(PaginaInicial);

    const pagina = fixture.componentInstance;

    expect(pagina).toBeTruthy();

  });

});