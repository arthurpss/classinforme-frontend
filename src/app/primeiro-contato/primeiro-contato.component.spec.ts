import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeiroContatoComponent } from './primeiro-contato.component';

describe('PrimeiroContatoComponent', () => {
  let component: PrimeiroContatoComponent;
  let fixture: ComponentFixture<PrimeiroContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeiroContatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeiroContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
