import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanoComponent } from './admin-plano.component';

describe('AdminPlanoComponent', () => {
  let component: AdminPlanoComponent;
  let fixture: ComponentFixture<AdminPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
