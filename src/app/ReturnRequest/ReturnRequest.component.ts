import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConfirmReturnService } from '../ConfirmResponse/confirmReturn.service';
import { AuthenticationService } from '../services/authentication.service';
import { ComponentProcessingService } from '../services/component-processing.service';
import { User } from '../services/user.model';
import { DefectiveComponentDetail, ResponseData, ReturnRequest } from './ReturnRequest.model';
import { ReturnRequestService } from './ReturnRequest.service';

@Component({
  selector: 'app-ReturnRequest',
  templateUrl: './ReturnRequest.component.html',
  styleUrls: ['./ReturnRequest.component.css']
})
export class ReturnRequestComponent implements OnInit, OnDestroy {

  requestForm: FormGroup;
  componentTypes = ['Integral', 'Accessory'];
  isLoading: boolean = false;
  requestObserver: Observable<ResponseData>;
  requestFailed: boolean = false;
  requestErrors: string;
  username: string;
  usernameSubscription: Subscription;
  requestSubscription: Subscription;
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  constructor(private returnRequestService: ReturnRequestService, private router: Router, private confirmReturnService: ConfirmReturnService, private componentProcessingService: ComponentProcessingService, private authenticationService: AuthenticationService) {
    this.createForm();
  }
  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe;
    this.requestSubscription.unsubscribe;
  }
  ngOnInit() {
    this.isLoading = false;
  }
  onSubmit() {
    this.usernameSubscription = this.authenticationService.user.subscribe(
      (user: User) => {
        this.username = user.username;
      }
    );
    let defectiveComponentDetail = new DefectiveComponentDetail(this.requestForm.value['componentName'], this.requestForm.value['componentType'], this.requestForm.value['quantity']);
    const returnRequest = new ReturnRequest(this.username, this.requestForm.value['contactNumber'], defectiveComponentDetail);
    this.requestObserver = this.componentProcessingService.getRequestToComponentprocessing(returnRequest);
    this.isLoading = true;
    this.requestSubscription = this.requestObserver.subscribe(
      (responseData: ResponseData) => {
        if (responseData != null) {
          this.confirmReturnService.setResponse(responseData);
          this.isLoading = false;
          this.router.navigate(['/confirm']);
        }
      },
      errorMessage => {
        switch (errorMessage.status) {
          case 0:
            this.requestErrors = "Unable to Connect to the Server";
            break;
          case 503:
            this.requestErrors = "Service Temporarily Unavailable";
            break;
          case 401:
            this.requestErrors = "sorry you are not authorized to make this request";
            break;
          case 404:
            this.requestErrors = "sorry we are not able to process your request";
            break;
          default:
            this.requestErrors = "Error occured , Try again"
            break;
        }
        this.requestFailed = true;
        this.isLoading = false;
      }
    )
  }
  resetForm() {
    this.reset();
    this.router.navigate(['/home'])
  }

  tryAgain() {
    this.reset();
    this.createForm();
  }

  reset() {
    this.requestForm.reset();
    this.requestFailed = false;
  }

  get registerFormControl() {
    return this.requestForm.controls;
  }

  createForm() {
    this.requestForm = new FormGroup(
      {
        'contactNumber': new FormControl(null, [Validators.pattern('[1-9][0-9]*'), Validators.minLength(10), Validators.maxLength(10), Validators.required, this.noWhitespaceValidator]),
        'componentName': new FormControl(null, [Validators.required, Validators.maxLength(30), this.noWhitespaceValidator]),
        'componentType': new FormControl('Integral', Validators.required),
        'quantity': new FormControl(null, [Validators.required, Validators.max(9999), Validators.min(1)])
      });
  }
}
