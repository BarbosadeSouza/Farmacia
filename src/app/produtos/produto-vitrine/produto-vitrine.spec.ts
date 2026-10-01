import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutoVitrine } from './produto-vitrine';

describe('ProdutoVitrine', () => {
  let component: ProdutoVitrine;
  let fixture: ComponentFixture<ProdutoVitrine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoVitrine],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoVitrine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
