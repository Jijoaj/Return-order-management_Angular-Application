import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ConfirmReturnService } from "../confirmReturn.service";

@Injectable({
    providedIn: 'root'
  })


export class PaymentGuard implements CanActivate{

constructor(private confirmReturnService:ConfirmReturnService,private router:Router){
}    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.confirmReturnService.onGoingTransaction)
        return true;
        else{  
         return this.router.createUrlTree(['/home'])
        }
    }
    
}
