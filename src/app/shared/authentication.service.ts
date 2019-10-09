import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../projects/model/user";
import * as moment from "moment";
import {tap} from "rxjs/operators";


/**
 * A Service which is used to perform actions related to user authentication / login etc
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * injects the required dependency
   * @param http: required to allow http requests to be made by the sercive
   */
  constructor(private http: HttpClient) {
  }


  /**
   * Call the back end's login method with the given username and password
   * If successful, call the setSession method to save the returned JWT
   * @param username
   * @param password
   */
  login(username: string, password: string) {
    let url = 'https://localhost:8443/login';
    return this.http.post<User>(url, {username, password})
      .pipe(tap(res => {
        this.setSession(res);

      }));
  }

  /**
   * Given the result of the login http call performed in the login method,
   * set the relevant parameters into localStorage so they can be accessed
   * in other components of the app
   * @param authResult
   */
  private setSession(authResult) {
    //find the expiry date of the JWT by adding the time it lasts for to the current moment
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    //set the JWT into localStorage
    localStorage.setItem('id_token', authResult.token);
    //set the expiry time/date into localStorage
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

  }

  /**
   * Used to ascertain if any user is logged in (for instance, in nav component when deciding
   * which nav items to display.
   * Returns true if the expiry of the JWT has not passed, else false
   */
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  /**
   * Gets and returns the JWT expiry date/time which is stored in localStorage
   */
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  /**
   * Get the username of the currently logged in user
   */
  getLoggedInUser() {
    const user = localStorage.getItem("username");
    return user;
  }


}
