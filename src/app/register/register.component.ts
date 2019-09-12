import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../projects/model/user";
import {LoginServiceService} from "../shared/login-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model:NewUser = {
  username:"",
  password:"",
  email:""
};
pwConfirm:string = "";

  ngOnInit() {
  }

  constructor(private http:HttpClient,
              private router:Router,
              private authService:AuthService,
              private loginService:LoginServiceService){

  }

register():void{
  this.http.post<User>("https://localhost:8443/users", this.model).subscribe(
        res => {
          alert("successful registration, " + res.userId + res.username);

          //todo see if this can be pulled out to a service??
          this.authService.login(this.model.username, this.model.password).subscribe(
            () => {
              localStorage.setItem('username', this.model.username);
              this.loginService.storeUserId(this.model.username);
              console.log("User is logged in");
              this.router.navigateByUrl('/');
            }
          );
        }, err => {
              alert("an error with registration" +err)
            }
  )

}



  // form:FormGroup;
  //
  // constructor(private fb:FormBuilder,
  //             private http:HttpClient,
  //             private authService: AuthService,
  //             private router: Router,
  //             private loginService: LoginServiceService
  //             ){
  //   this.form = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required],
  //     email: ['']
  //
  //   });
  // }


  // register(){
  //   const val = this.form.value;
  //
  //   if (val.username && val.password && val.email){
  //     this.http.post<User>("https://localhost:8443/users", val).subscribe(
  //       res =>{
  //         alert("successful registration, " + res.userId+res.username)
  //
  //         //todo see if this can be pulled out to a service??
  //           this.authService.login(val.username, val.password).subscribe(
  //             () => {
  //               localStorage.setItem('username', val.username);
  //               this.loginService.storeUserId(val.username);
  //               console.log("User is logged in");
  //               this.router.navigateByUrl('/');
  //             }
  //           );
  //
  //       },
  //       err => {
  //         console.log("an error with registration" +err)
  //       }
  //     )
  //   }
  // }




}


export interface NewUser {
  username:string,
  password:string;
  email:string,
}
