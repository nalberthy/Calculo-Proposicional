import { TestBed } from '@angular/core/testing';

import { ExeciciosConceituaisService } from './execicios-conceituais.service';

describe('ExeciciosConceituaisService', () => {
  let service: ExeciciosConceituaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExeciciosConceituaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
