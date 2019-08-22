import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn())
      return true;

    //if no user is logged in, send them to the login page
    //todo this isn't the functionality i want but putting it in for now while following the tutorial
    //todo instead I want it to either pop up a message or show an error??
    this.router.navigate(['login']);
    return false;

  }

}
