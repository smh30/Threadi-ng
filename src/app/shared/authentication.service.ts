import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username, password) {
    if (username === "hello" && password === "password") {
      sessionStorage.setItem('username', username);
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user:string = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null)
  }

  loggedInUser(){
    let user: string = sessionStorage.getItem('username');
    return user;
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
