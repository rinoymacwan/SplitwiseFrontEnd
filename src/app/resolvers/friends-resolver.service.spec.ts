import { TestBed } from '@angular/core/testing';

import { FriendsResolverService } from './friends-resolver.service';

describe('FriendsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendsResolverService = TestBed.get(FriendsResolverService);
    expect(service).toBeTruthy();
  });
});
