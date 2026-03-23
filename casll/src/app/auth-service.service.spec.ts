import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthServiceservice } from './auth-service.service';

describe('AuthServiceservice', () => {
  let service: AuthServiceservice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthServiceservice]
    });
    service = TestBed.inject(AuthServiceservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
