import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
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
