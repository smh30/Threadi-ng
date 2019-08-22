import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isCollapsed = true;

  constructor(private loginService:AuthenticationService) { }

  ngOnInit() {
  }

}
