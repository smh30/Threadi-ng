import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/authentication.service';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginServiceService} from "../shared/login-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'

})

/**
 * The logic for the login page
 */
export class LoginComponent {

  form: FormGroup;
  message: string = "";

  /**
   * Constructor: injects all the parameters as dependencies, as they will be required elsewhere in the class
   * @param fb
   * @param authService
   * @param router
   * @param loginService
   */
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private loginService: LoginServiceService) {

    //create a responsive form control with the required fields, and attach the "required" validator to each field
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  /**
   * Initiates the login process. Called when the form is submitted.
   * If both form fields are completed, uses the AuthService login method to perform actual login. If login is successful, sets
   * the username and userId into localStorage and navigates to the main page.
   *
   * If login unsuccessful, or form isn't complete, displays an error message.
   */
  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(
        () => {
          try {this.loginService.storeUserNameAndId(val.username);}
          catch (e) {
            this.message= "Something went wrong, please try again"
          }
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
