import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/authentication.service';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginServiceService} from "../shared/login-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  message: string = "";

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private loginService: LoginServiceService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  login() {
    const val = this.form.value;
    console.log("in login method")

    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(
        () => {
          localStorage.setItem('username', val.username);
          this.loginService.storeUserId(val.username);
          console.log("User is logged in");
          this.router.navigateByUrl('/');
        },
        err => {
          this.message = "Username or password was incorrect. Please try again"
        }
      );
    } else {
      this.message = "Both username and password are required"
    }
  }


}
