import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosEmpresaComponent } from './produtos-empresa.component';

describe('ProdutosEmpresaComponent', () => {
  let component: ProdutosEmpresaComponent;
  let fixture: ComponentFixture<ProdutosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
