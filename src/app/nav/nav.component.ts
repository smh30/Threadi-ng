import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/authentication.service";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //whether or not the nav menu is open on small screens
  navbarOpen = false;

  constructor(private loginService:AuthService) {
  }

  ngOnInit() {
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }

}
