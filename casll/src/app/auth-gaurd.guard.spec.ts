import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AbilityGuard } from './auth-gaurd.guard';
import { AuthServiceservice } from './auth-service.service';
import { AbilityService } from './ability.service';

describe('AbilityGuard', () => {
  let guard: AbilityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AbilityGuard,
        AuthServiceservice,
        AbilityService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });
    guard = TestBed.inject(AbilityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
