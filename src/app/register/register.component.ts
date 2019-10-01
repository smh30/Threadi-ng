import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../projects/model/user";
import {LoginServiceService} from "../shared/login-service.service";
// import {MustMatch} from "./must-match.validator";
import {CustomValidators} from "./custom-validators";
import {UniqueUsernameValidator} from "./unique-username-validator";
import {UsernameService} from "./username-service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted: boolean = false;


  //https://codinglatte.com/posts/angular/cool-password-validation-angular/

  registerForm = this.fb.group({
    username: ['', Validators.required, UniqueUsernameValidator(this.usernameService)],
    email: ['', [Validators.required, Validators.email]],

    password1: ['', [Validators.required, Validators.minLength(10),
    CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true}),
    CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true}),
  CustomValidators.patternValidator(/\d/, { hasNumber: true})]],
    password2: ['', [Validators.required]],
  }
  , {
    validator: CustomValidators.passwordMatchValidator
  }
  );

  ngOnInit() {
  }

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private loginService: LoginServiceService,
              private fb: FormBuilder,
  private usernameService: UsernameService) {

  }

  onSubmit() {
    this.submitted = true;

    // Object.keys(this.registerForm.controls).forEach(control =>
    // console.log(control.));

    console.warn(this.registerForm.value);
    if (this.registerForm.invalid) {
      console.log("still invalid");
      return;
    }
    alert('yay form is good!!');
    this.register();



  }

  get f() {
    return this.registerForm.controls
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get("password1");
  }




  register(): void {

    let user:NewUser = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password1,
    email: this.registerForm.value.email
    };

    console.log(user);

    this.http.post<User>("https://localhost:8443/users", user).subscribe(
      res => {
        alert("successful registration, " + res.userId + res.username);

        //todo see if this can be pulled out to a service??
        this.authService.login(user.username, user.password).subscribe(
          () => {
            localStorage.setItem('username', user.username);
            this.loginService.storeUserNameAndId(user.username);
            console.log("User is logged in");
            this.router.navigateByUrl('/');
          }
        );
      }, err => {
        alert("an error with registration" + err)
      }
    )

  }

}

export interface NewUser {
  username:string;
  password:string;
  email:string;
}



