import { TestBed } from '@angular/core/testing';

import { CriarBaralhoService } from './criar-baralho.service';

describe('CriarBaralhoService', () => {
  let service: CriarBaralhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarBaralhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
