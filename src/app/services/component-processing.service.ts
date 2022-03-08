import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseData, ReturnRequest } from '../ReturnRequest/ReturnRequest.model';

@Injectable({
  providedIn: 'root'
})

export class ComponentProcessingService {
  httpHeaders: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) { }

  getRequestToComponentprocessing(returnRequest: ReturnRequest) {
    return this.http.get<ResponseData>(environment.processDetailURL, {
      headers: this.httpHeaders,
      params: {
        processRequest: JSON.stringify(returnRequest)
      }
    }
    )
  }
}
