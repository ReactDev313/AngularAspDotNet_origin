import { TestBed } from '@angular/core/testing';

import { BackendUrlInterceptorService } from './backend-url-interceptor.service';

describe('BackendUrlInterceptorService', () => {
  let service: BackendUrlInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendUrlInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
