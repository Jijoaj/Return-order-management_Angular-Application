import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, exhaustMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === environment.processDetailURL || req.url === environment.completeProcessingURL) {
      return this.authService.user.pipe(take(1), exhaustMap(
        user => {
          if (!user) {
            return next.handle(req)
          }
          const modifiedrequest = req.clone(
            {
              headers: new HttpHeaders({
                'Authorization': 'Bearer ' + user.token
                , 'Access-Control-Allow-Origin': '*'
              })
            }
          );
          // console.log(modifiedrequest);
          return next.handle(modifiedrequest)
        }));
    }
    else {
      return next.handle(req)
    }
  }
}