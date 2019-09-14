import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private http: HttpClient){

  }
  //this is where the http goes
  // isUsernameTaken: (username: string) => Observable<boolean>

  getUserByUsername(username: string): Observable<any>{
    return this.http.get('https://localhost:8443/users/checkUsername/'+username);
  }
}
