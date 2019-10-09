import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../projects/model/user";
import {LoginServiceService} from "../shared/login-service.service";
import {CustomValidators} from "./custom-validators";
import {UniqueUsernameValidator} from "./unique-username-validator";
import {UsernameService} from "./username-service";

/**
 * Controller for the registration form component
 * Thanks to: https://codinglatte.com/posts/angular/cool-password-validation-angular/
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //has the form been submitted? Used in the template so that errors only show up after submission is attempted
  submitted: boolean = false;

  //The data model for the form. Each item has an empty value to begin with, and validators are set to define
  //when the form field's data will be acceptable to submit the form
  registerForm = this.fb.group({
      username: ['', Validators.required, UniqueUsernameValidator(this.usernameService)],
      email: ['', [Validators.required, Validators.email]],

      password1: ['', [Validators.required, Validators.minLength(10),
        CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
        CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomValidators.patternValidator(/\d/, {hasNumber: true})]],
      password2: ['', [Validators.required]],
    }
    , {
      //check whether the two password fields match
      validator: CustomValidators.passwordMatchValidator
    }
  );

  ngOnInit() {
  }

  //Inject all the required dependencies when creating this component
  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private loginService: LoginServiceService,
              private fb: FormBuilder,
              private usernameService: UsernameService) {

  }

  onSubmit() {

    this.submitted = true;

    //if the form is invalid, i.e. some fields validations don't pass, then return without submitting
    //the data to the back end
    if (this.registerForm.invalid) {
      console.log("still invalid");
      return;
    }

    //if the form is valid, register the user
    this.register();


  }



/**Send the form data to the back end so that the user can be registered into the database, then log them in
  and redirect to the main page */
  register(): void {

  /**
   * Create a NewUser object with the data entered into the form: this contains all the necessary information
   * to register the user into the database.
   */
  let user: NewUser = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password1,
      email: this.registerForm.value.email
    };

  /**
   * Perform a POST request to the user registration endpoint, with the user data object previously created
   */
    this.http.post<User>("https://localhost:8443/users", user).subscribe(
      res => {

        //If successful, login the new user
        this.authService.login(user.username, user.password).subscribe(
          () => {
            //Once logged in, store the username and Id in localstorage and redirect to main page
            this.loginService.storeUserNameAndId(user.username);
            this.router.navigateByUrl('/');
          }
        );
      }, err => {
        //If an error occurred, show an error message
        alert("an error occurred with registration, please try again" + err)
      }
    )

  }


  //-------------------------------------------------
  // get various values to make them easier to access in the template
  get form() {
    return this.registerForm.controls
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get("password1");
  }

  //------------------------------------------------

}



// A model representing the data entered into the form, so that it can be easily sent via http
export interface NewUser {
  username: string;
  password: string;
  email: string;
}



