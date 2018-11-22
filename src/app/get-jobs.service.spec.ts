import { TestBed } from '@angular/core/testing';

import { GetJobsService } from './get-jobs.service';

describe('GetJobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetJobsService = TestBed.get(GetJobsService);
    expect(service).toBeTruthy();
  });
});
