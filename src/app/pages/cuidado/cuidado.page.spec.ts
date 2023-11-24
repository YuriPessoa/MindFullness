import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuidadoPage } from './cuidado.page';

describe('CuidadoPage', () => {
  let component: CuidadoPage;
  let fixture: ComponentFixture<CuidadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CuidadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
