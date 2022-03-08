import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfirmPayment } from '../ReturnRequest/ReturnRequest.model';

@Injectable({
  providedIn: 'root'
})
export class CompleteProcessingService {
  confirmationStatus = new Subject<string>();
  httpHeaders: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) { }

  postCompleteProcessing(confirmPayment: ConfirmPayment) {
    return this.http.post<string>(environment.completeProcessingURL, confirmPayment, { headers: this.httpHeaders, responseType: 'text' as 'json' }
    ).pipe(  
        tap(resData => {
          this.confirmationStatus.next(resData);
        })
    )
  }

}
