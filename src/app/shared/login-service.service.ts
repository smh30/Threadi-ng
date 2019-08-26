import { Injectable } from '@angular/core';
import {User} from "../projects/model/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  storeUserId(username) {
    console.log("setting session");
    let url = 'https://localhost:8443/users/byUsername/' + username;
    this.http.get<User>(url).subscribe(res => {
        localStorage.setItem("userId", res.userId);
      },
      err => {
        console.log("issue getting id for logged in user")
      })
  }

}
