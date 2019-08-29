import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/authentication.service";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isCollapsed = true;
  navbarOpen = false;

  constructor(private loginService:AuthService) {
  }

  ngOnInit() {
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }

}
