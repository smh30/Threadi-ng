import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username, password) {
    //todo check if username exists
    //if so , check if password is ok.
    //or, does this whole thing pass to backend? if so, do I have to encrypt first?
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
