import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoEmpresasComponent } from './edicao-empresas.component';

describe('EdicaoEmpresasComponent', () => {
  let component: EdicaoEmpresasComponent;
  let fixture: ComponentFixture<EdicaoEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoEmpresasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicaoEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
