import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoProposicionalComponent } from './calculo-proposicional.component';

describe('CalculoProposicionalComponent', () => {
  let component: CalculoProposicionalComponent;
  let fixture: ComponentFixture<CalculoProposicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculoProposicionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoProposicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
