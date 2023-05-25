import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaUpdateComponent } from './venta-update.component';

describe('VentaUpdateComponent', () => {
  let component: VentaUpdateComponent;
  let fixture: ComponentFixture<VentaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
