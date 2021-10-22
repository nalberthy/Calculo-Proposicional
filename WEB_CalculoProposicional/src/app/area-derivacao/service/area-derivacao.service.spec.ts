import { TestBed } from '@angular/core/testing';

import { AreaDerivacaoService } from './area-derivacao.service';

describe('AreaDerivacaoService', () => {
  let service: AreaDerivacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaDerivacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
