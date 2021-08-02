import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanosComponent } from './admin-planos.component';

describe('AdminPlanosComponent', () => {
  let component: AdminPlanosComponent;
  let fixture: ComponentFixture<AdminPlanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlanosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
