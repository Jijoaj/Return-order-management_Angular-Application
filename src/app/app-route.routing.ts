import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmGuard } from './ConfirmResponse/ConfirmGuard';
import { ConfirmResponseComponent } from './ConfirmResponse/ConfirmResponse.component';
import { CanDeactivateGuardPayment } from './ConfirmResponse/payment/canDeactivateGuardPayment';
import { PaymentComponent } from './ConfirmResponse/payment/payment.component';
import { PaymentGuard } from './ConfirmResponse/payment/paymentGuard';
import { ProceedComponent } from './ConfirmResponse/proceed/proceed.component';
import { DetailsComponent } from './Homepage/Details/Details.component';
import { HomepageComponent } from './Homepage/Homepage.component';
import { AuthGuard } from './login/Auth-Guard';
import { LoginComponent } from './login/login.component';
import { ReturnRequestComponent } from './ReturnRequest/ReturnRequest.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: ReturnRequestComponent, canActivate: [AuthGuard] },
  {
    path: 'confirm', component: ConfirmResponseComponent, canActivate: [ConfirmGuard, AuthGuard]
    , children: [
      { path: '', component: ProceedComponent },
      { path: 'payment', component: PaymentComponent, canActivate: [PaymentGuard], canDeactivate: [CanDeactivateGuardPayment] }]
  }, {
    path: '*', component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}