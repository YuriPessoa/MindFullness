import { TestBed } from '@angular/core/testing';

import { DescricaoService } from './descricao.service';

describe('DescricaoService', () => {
  let service: DescricaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescricaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
