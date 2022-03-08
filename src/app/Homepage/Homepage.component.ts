import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-Homepage',
  templateUrl: './Homepage.component.html',
  styleUrls: ['./Homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {

    this.authenticationService.autoLogin();
  }

}
