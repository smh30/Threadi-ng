import { Component } from '@angular/core';

/**
 * The root component of the app. Left in default state.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'craft-ng-app';
  parentSearch:string;

}
