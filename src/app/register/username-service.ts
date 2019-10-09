import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../projects/model/user";

/**
 * A service which exists only to check if a username already exists in the db
 */
@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  //http injected in constructor so it can be used in class
  constructor(private http: HttpClient){
  }

  /**
   * Given a username (which was entered into the registration form and passed through by the uniqueUsernameValidator)
   * make an HTTP call to see if a user by that name exists already. The http call returns a User object.
   *
   * This method returns an Observable (which is always the return type from http calls) which is then handled by
   * the validator which called the method.
   * @param username - the username to check for
   */
  getUserByUsername(username: string): Observable<any>{
    return this.http.get<User>('https://localhost:8443/users/byUsername/'+username);
  }
}
