import { TestBed } from '@angular/core/testing';

import { PayersResolverService } from './payers-resolver.service';

describe('PayersResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayersResolverService = TestBed.get(PayersResolverService);
    expect(service).toBeTruthy();
  });
});
