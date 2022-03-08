/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReturnRequestService } from './ReturnRequest.service';

describe('Service: ReturnRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReturnRequestService]
    });
  });

  it('should ...', inject([ReturnRequestService], (service: ReturnRequestService) => {
    expect(service).toBeTruthy();
  }));
});
