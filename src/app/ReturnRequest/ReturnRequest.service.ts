import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ComponentProcessingService } from '../services/component-processing.service';
import { ResponseData, ReturnRequest } from './ReturnRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ReturnRequestService {
  currentReturnRequest: ReturnRequest;
  requestObserver: Observable<ResponseData>;


  constructor(private componentProcessingService: ComponentProcessingService) { }

  setCurrentReturnRequest(returnRequest: ReturnRequest) {
    this.requestObserver = this.componentProcessingService.getRequestToComponentprocessing(returnRequest);
  }
}
