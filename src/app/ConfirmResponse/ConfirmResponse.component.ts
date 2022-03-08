import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData } from '../ReturnRequest/ReturnRequest.model';
import { ConfirmReturnService } from './confirmReturn.service';

@Component({
  selector: 'app-ConfirmResponse',
  templateUrl: './ConfirmResponse.component.html',
  styleUrls: ['./ConfirmResponse.component.css']
})
export class ConfirmResponseComponent implements OnInit {

  currentResponseData: ResponseData;
  totalCharge: number ;
  constructor(private confirmReturnService: ConfirmReturnService, private router: Router) { }
  ngOnInit() {
    this.currentResponseData = this.confirmReturnService.getResponse();
    this.totalCharge = this.currentResponseData.packagingAndDeliveryCharge + this.currentResponseData.processingCharge;

  }
}

