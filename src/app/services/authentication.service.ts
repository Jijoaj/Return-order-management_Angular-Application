import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResonseData {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string,
  jti: string
}



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user = new BehaviorSubject<User>(null);
  username: string;
  private expirationTimer: any;
  constructor(private http: HttpClient, private router: Router) { }

  private handleAuthentication(idToken: string, expiresIn: number) {
    const expirationTime = new Date(new Date().getTime() + +expiresIn * 100);
    const user = new User(this.username, idToken, expirationTime);
    this.user.next(user);
    this.autoLogout(+expiresIn * 100);
    localStorage.setItem('userData', JSON.stringify(user))
  }
  logout() {
    this.user.next(null);
    localStorage.clear();
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer)
    }
    this.expirationTimer = null;
  }

  autoLogout(expirationTime: number) {
    // console.log(expirationTime);
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime)
  }

  autoLogin() {
    const userData: {
      username: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      this.user.next(null);
      return;
    }
    // console.log(userData._tokenExpirationDate);

    const loadedUser = new User(userData.username, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const sessionExpiresIn: number = (new Date(userData._tokenExpirationDate).getTime()) - (new Date().getTime());
      this.autoLogout(sessionExpiresIn);
    }
  }

  httpHeaders: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  });

  // *User SignUp

  signup(username: string, password: string) {

    return this.http.post<string>(environment.signup, null,
      {
        params: {
          username: username,
          password: password
        }, headers: this.httpHeaders, responseType: 'text' as 'json'

      }).pipe(
        catchError(errorRes => {
          let errorMessage: string;
          switch (errorRes.status) {
            case 409:
              errorMessage = "username already exists, try different username";
              break;
            case 400:
              errorMessage = "invalid credentials provided for user creation";
              break;
            case 307:
              errorMessage = "unable to add user temporarly, try again later";
              break;
            case 404:
              errorMessage = "service not available, try again later";
              break;
            default:
              errorMessage = "an error occured while sign up.Please try again"
              break;
          }
          return throwError(() => new Error(errorMessage))
        }
        ))
  }


  signInHttpHeaders: HttpHeaders = new HttpHeaders({
    'Authorization': 'Basic cmV0dXJub3JkZXJtYW5hZ2VtZW50YXBwOjk4OTU=',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'

  });

  //sign in 
  signIn(usernameUi: string, password: string) {
    this.username = usernameUi;
    return this.http.post<AuthResonseData>(environment.tokenURL, null,
      {
        params: {
          username: usernameUi,
          password: password,
          grant_type: 'password',
          scopes: 'read write'
        }, headers: this.signInHttpHeaders
      }).pipe(
        catchError(errorRes => {
          let errorMessage: string;
          switch (errorRes.status) {
            case 400:
              errorMessage = "Invalid username or password";
              break;
            case 404:
              errorMessage = "Service not available";
              break;
            default:
              errorMessage = 'User sign in failed.Please try again';
              break;
          }
          return throwError(() => new Error(errorMessage));
        }
        ), tap(
          resData => {
            this.handleAuthentication(resData.access_token, +resData.expires_in);
          }
        ))
  }
}