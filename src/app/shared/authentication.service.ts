import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../projects/model/user";
import * as moment from "moment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  //We are calling shareReplay to prevent the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.
  //https://blog.angular-university.io/angular-jwt-authentication/
  login(username: string, password: string) {
    let url = 'https://localhost:8443/login';
    return this.http.post<User>(url, {username, password})
      .pipe(tap(res => {
        this.setSession(res);

      }));


  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem(("expires_at"));
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getLoggedInUser() {
    const user = localStorage.getItem("username");
    return user;
  }


}
