import { TestBed } from '@angular/core/testing';

import { PayeesResolverService } from './payees-resolver.service';

describe('PayeesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayeesResolverService = TestBed.get(PayeesResolverService);
    expect(service).toBeTruthy();
  });
});
