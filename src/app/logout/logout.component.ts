import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.removeItem("expires_at");
    localStorage.removeItem("id_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

  }

}
