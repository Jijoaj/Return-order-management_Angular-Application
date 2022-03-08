import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }


  navigateToRegisterRequest()
  {
    this.router.navigate(['/register'])
  }
}
