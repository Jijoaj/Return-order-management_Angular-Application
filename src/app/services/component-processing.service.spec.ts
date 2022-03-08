/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComponentProcessingService } from './component-processing.service';

describe('Service: ComponentProcessing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentProcessingService]
    });
  });

  it('should ...', inject([ComponentProcessingService], (service: ComponentProcessingService) => {
    expect(service).toBeTruthy();
  }));
});
