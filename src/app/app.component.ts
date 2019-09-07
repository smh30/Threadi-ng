import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
// import {slideInAnimation} from "./shared/animations";
//
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [
  //   slideInAnimation
  //   //animation triggers go here???
  // ]
})
export class AppComponent {
  title = 'craft-ng-app';
  parentSearch:string;

  // prepareRoute(outlet: RouterOutlet){
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }
}
