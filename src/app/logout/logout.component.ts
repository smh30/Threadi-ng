import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


/**
 * Logs the user out
 *
 * On initialisation, removes all JWT and other keys from localstorage
 * and navigates to homepage
 */
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.removeItem("expires_at");
    localStorage.removeItem("id_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    this.router.navigateByUrl('/');

  }

}
