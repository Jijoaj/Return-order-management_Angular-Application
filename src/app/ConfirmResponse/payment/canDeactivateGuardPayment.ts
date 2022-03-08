import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface CanDeactivatePayment {

    canDeactivate: () => Observable<boolean> | boolean | Promise<boolean>;
}

export class CanDeactivateGuardPayment implements CanDeactivate<CanDeactivatePayment>{
    canDeactivate(component: CanDeactivatePayment, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return component.canDeactivate();
    }

}