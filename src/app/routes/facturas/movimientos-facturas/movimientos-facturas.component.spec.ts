import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosFacturasComponent } from './movimientos-facturas.component';

describe('MovimientosFacturasComponent', () => {
  let component: MovimientosFacturasComponent;
  let fixture: ComponentFixture<MovimientosFacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosFacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
