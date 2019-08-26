import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor() { }

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
}
