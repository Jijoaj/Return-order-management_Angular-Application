/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfirmReturnService } from './confirmReturn.service';

describe('Service: ConfirmReturn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmReturnService]
    });
  });

  it('should ...', inject([ConfirmReturnService], (service: ConfirmReturnService) => {
    expect(service).toBeTruthy();
  }));
});
