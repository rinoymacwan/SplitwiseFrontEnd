import { TestBed } from '@angular/core/testing';

import { ExpensesResolverService } from './expenses-resolver.service';

describe('ExpensesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpensesResolverService = TestBed.get(ExpensesResolverService);
    expect(service).toBeTruthy();
  });
});
