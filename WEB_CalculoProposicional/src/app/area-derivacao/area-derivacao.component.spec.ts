import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDerivacaoComponent } from './area-derivacao.component';

describe('AreaDerivacaoComponent', () => {
  let component: AreaDerivacaoComponent;
  let fixture: ComponentFixture<AreaDerivacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaDerivacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaDerivacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
