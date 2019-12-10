import { TestBed } from '@angular/core/testing';

import { ProfilingServiceService } from './profiling-service.service';

describe('ProfilingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilingServiceService = TestBed.get(ProfilingServiceService);
    expect(service).toBeTruthy();
  });
});
