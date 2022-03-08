import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppComponent } from './app.component';
import { NavbarComponent } from './Homepage/navbar/navbar.component';
import { ShowcaseComponent } from './Homepage/showcase/showcase.component';
import { HomepageComponent } from './Homepage/Homepage.component';
import { DetailsComponent } from './Homepage/Details/Details.component';
import { ReturnRequestComponent } from './ReturnRequest/ReturnRequest.component';
import { AppRoutingModule } from './app-route.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmResponseComponent } from './ConfirmResponse/ConfirmResponse.component';
import { PaymentComponent } from './ConfirmResponse/payment/payment.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { CanDeactivateGuardPayment } from './ConfirmResponse/payment/canDeactivateGuardPayment';
import { LoginComponent } from './login/login.component';
import { AuthInterceptorService } from './login/AuthInterceptor.service';
@NgModule({
  declarations: [							
    AppComponent,
      NavbarComponent,
      ShowcaseComponent,
      HomepageComponent,
      DetailsComponent,
      ReturnRequestComponent,
      ConfirmResponseComponent,
      PaymentComponent,
      SubHeaderComponent,
      LoginComponent
   ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CanDeactivateGuardPayment,
    {provide:HTTP_INTERCEPTORS,useClass: AuthInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
