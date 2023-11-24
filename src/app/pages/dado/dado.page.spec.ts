import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DadoPage } from './dado.page';

describe('DadoPage', () => {
  let component: DadoPage;
  let fixture: ComponentFixture<DadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
