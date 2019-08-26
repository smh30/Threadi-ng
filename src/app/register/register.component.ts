import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../projects/model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  ngOnInit() {
  }
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private http:HttpClient,
              private authService: AuthService,
              private router: Router
              ){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['']

    });
  }


  register(){
    const val = this.form.value;

    if (val.username && val.password && val.email){
      this.http.post<User>("https://localhost:8443/users", val).subscribe(
        res =>{
          alert("successful registration, " + res.userId+res.username)

          //todo see if this can be pulled out to a service??
            this.authService.login(val.username, val.password).subscribe(
              () => {
                localStorage.setItem('username', val.username);
                console.log("User is logged in");
                this.router.navigateByUrl('/');
              }
            );

        },
        err => {
          console.log("an error with registration" +err)
        }
      )
    }
  }




}
