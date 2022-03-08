import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService, AuthResonseData } from '../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  isLoading: boolean = false;
  errorOccuredSignUp: string;
  errorOccuredSignIn: string;
  signUpSubscription:Subscription;
  signinSubscription:Subscription;
  constructor(private authService: AuthenticationService, private router: Router) { }
  ngOnDestroy(): void {
    this.signUpSubscription?.unsubscribe();
    this.signinSubscription?.unsubscribe();
  }

  ngOnInit() {
  }
  onSignIn(form: NgForm) {
    // console.log(form);
    const username = form.value.signInUserName;
    const password = form.value.signInPassword;
    this.signIn(username, password);

  }
  onSignup(form: NgForm) {
    const username = form.value.signUpUserName;
    const password = form.value.signUpPassword;
    let authObs: Observable<string>
    authObs = this.authService.signup(username, password);
    this.signUpSubscription=authObs.subscribe(
      resData => {
        this.signIn(username, password)
      },
      errorMessage => {
        this.errorOccuredSignUp = errorMessage.message;
        this.errorOccuredSignIn = null;
        form.reset();
      }
    );
  }
  signIn(username: string, password: string) {
    let authObs: Observable<AuthResonseData>
    authObs = this.authService.signIn(username, password);
    this.signinSubscription=authObs.subscribe(
      (resData) => {
        this.router.navigate(['/home']);
      },
      (errorMessage) => {
        this.errorOccuredSignIn = errorMessage.message;
        this.errorOccuredSignUp = null;
      }
    );
  }
}
