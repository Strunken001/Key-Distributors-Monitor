import { TestBed } from '@angular/core/testing';

import { FileuploaderService } from './fileuploader.service';

describe('FileuploaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileuploaderService = TestBed.get(FileuploaderService);
    expect(service).toBeTruthy();
  });
});
