import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/services/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User;
  private userSub: Subscription;
  isAuthenticated: Boolean = false;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userSub = this.authenticationService.user.subscribe(
      (user) => {
        this.user = user
        this.isAuthenticated = !!user;
      }
    )
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  logout() {
    this.authenticationService.logout();
  }
}
