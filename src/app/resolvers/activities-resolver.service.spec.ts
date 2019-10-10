import { TestBed } from '@angular/core/testing';

import { ActivitiesResolverService } from './activities-resolver.service';

describe('ActivitiesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivitiesResolverService = TestBed.get(ActivitiesResolverService);
    expect(service).toBeTruthy();
  });
});
