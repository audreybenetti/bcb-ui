import { TestBed } from '@angular/core/testing';

import { MensagemService } from './mensagem-service.service';

describe('MensagemServiceService', () => {
  let service: MensagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
