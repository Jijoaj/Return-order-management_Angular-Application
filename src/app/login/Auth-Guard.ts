import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take, map } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authService.autoLogin();
    return this.authService.user.pipe(take(1), map(
      user => {
        const isAuth = !!user; // convert object to boolean
        if (isAuth) {
          return true;
        }
        else {
          return this.router.createUrlTree(['/login'])
        }
      }
    ))
  }

}
