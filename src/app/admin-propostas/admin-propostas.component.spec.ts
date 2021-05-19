import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropostasComponent } from './admin-propostas.component';

describe('AdminPropostasComponent', () => {
  let component: AdminPropostasComponent;
  let fixture: ComponentFixture<AdminPropostasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPropostasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPropostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
