/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompleteProcessingService } from './completeProcessing.service';

describe('Service: CompleteProcessing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompleteProcessingService]
    });
  });

  it('should ...', inject([CompleteProcessingService], (service: CompleteProcessingService) => {
    expect(service).toBeTruthy();
  }));
});
