import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../shared/authentication.service';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form:FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  login(){
    const val = this.form.value;

    if (val.username && val.password){
      this.authService.login(val.username, val.password).subscribe(
        () => {
          localStorage.setItem('username', val.username);
          console.log("User is logged in");
          this.router.navigateByUrl('/');
        }
      );
    }
  }


  // username = ''
  // password = ''
  // invalidLogin = false
  //
  // constructor(private router: Router,
  //             private loginservice: AuthenticationService) { }
  //
  // ngOnInit() {
  // }
  //
  // checkLogin() {
  //
  //   //probably have to send these as a formdata to the url
  //   if (this.loginservice.authenticate(this.username, this.password)
  //   ) {
  //     this.router.navigate(['']);
  //     this.invalidLogin = false
  //   } else
  //     alert("bad login");
  //     this.invalidLogin = true
  // }

}
