import { Component,  OnDestroy,  OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CompleteProcessingService } from 'src/app/services/completeProcessing.service';
import { ConfirmReturnService } from '../confirmReturn.service';
import { CanDeactivatePayment } from './canDeactivateGuardPayment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, CanDeactivatePayment ,OnDestroy{
  totalAmount: number;
  isLoading: boolean = false;
  paymentSuccessful: boolean = false;
  paymentFailed: boolean = false;
  paymentFailedMessage: string ;
  paymentSubscription:Subscription;
  ngOnInit(): void { }
  paymentForm: FormGroup;
  constructor(private confirmReturnService: ConfirmReturnService, private router: Router, private fb: FormBuilder, private completeProcessingService: CompleteProcessingService) {
    this.totalAmount = this.confirmReturnService.getTotal();
    this.paymentForm = this.fb.group
      (
        {
          'creditCardNumber': new FormControl('', [Validators.pattern('[1-9][0-9]*'), Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
          'creditLimit': new FormControl('', [Validators.pattern('[1-9][0-9]*'), Validators.required, Validators.min(this.totalAmount)])
        }
      )
  }
  ngOnDestroy(): void {
    this.paymentSubscription.unsubscribe;
  }
  onSubmit() {
    this.isLoading = true;
    this.confirmReturnService.makePayment(this.paymentForm.value['creditCardNumber'], this.paymentForm.value['creditLimit']);
    this.paymentSubscription=this.confirmReturnService.paymentObs.subscribe(
      resData => {
        if (resData === "success") {
          this.paymentSuccessful = true;
          this.isLoading = false;
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 5000);
          this.confirmReturnService.clearResponses();
        }
        else {
          this.transactionFailed();
        }
      },
      _errorMessage => {
        this.transactionFailed();
      }
    )
  }
  transactionFailed() {
    this.paymentFailed = true;
    this.isLoading = false;
  }
  get registerFormControl() {
    return this.paymentForm.controls;
  }

  tryAgain() {
    this.router.navigate(['/confirm'])
  }
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.paymentSuccessful || this.paymentFailed) {
      return true;
    } else {
      return confirm("Do you want to cancel transaction");
    }
  }
}
