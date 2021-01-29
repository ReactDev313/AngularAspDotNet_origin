import { TestBed } from '@angular/core/testing';

import { ProfileDetailsResolverService } from './profile-details-resolver.service';

describe('ProfileDetailsResolverService', () => {
  let service: ProfileDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
