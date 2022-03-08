import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfirmPayment, ResponseData } from '../ReturnRequest/ReturnRequest.model';
import { CompleteProcessingService } from '../services/completeProcessing.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmReturnService {
  requestResponse = new Subject<ResponseData>();
  requestResponse2: ResponseData;
  confirmPayment: ConfirmPayment;
  paymentObs: Observable<string>;
  onGoingTransaction: boolean = false;
  constructor(private completeProcessingService: CompleteProcessingService) { }


  setResponse(response: ResponseData) {
    this.requestResponse.next(response);
    this.requestResponse2 = response;
    this.onGoingTransaction = true;
  }

  getResponse(): ResponseData {
    return this.requestResponse2;
  }

  clearResponses() {
    this.requestResponse2=null;
    this.requestResponse.next(null);
    this.onGoingTransaction = false;
  }

  getTotal(): number {
    return this.requestResponse2.packagingAndDeliveryCharge + this.requestResponse2.processingCharge
  }

  makePayment(creditCardNumber: string, creditLimit: number) {

    this.confirmPayment = new ConfirmPayment(this.getResponse().requestId, creditCardNumber, creditLimit, this.getResponse().processingCharge)
    this.paymentObs = this.completeProcessingService.postCompleteProcessing(this.confirmPayment);
  }
}
