import {Injectable} from '@angular/core';
import {User} from "../projects/model/user";
import {HttpClient} from "@angular/common/http";


/**
 * Contains login-related function used in both login and register classes
 */
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) {
  }


  /**
   * Stores the username and ID of the logged in user in localstorage so that they
   * can be identified throughout the app
   *
   * Receives the username which has just logged in, calls api to get the associated
   * userId.
   * @param username
   */
  storeUserNameAndId(username) {
    let url = 'https://localhost:8443/users/byUsername/' + username;
    this.http.get<User>(url).subscribe(res => {
        localStorage.setItem("username", username);
        localStorage.setItem("userId", res.userId);
      },
      err => {
        throw err;

      })
  }

}
