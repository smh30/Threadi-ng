import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn, FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import {Directive, Injectable, Input} from "@angular/core";
import {Observable, timer} from "rxjs";
//import {UsernameService} from "./username-service";
import {catchError, map, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Validator} from "codelyzer/walkerFactory/walkerFn";
import {User} from "../projects/model/user";

@Directive({
  selector: '[appCheckUsername]',
  providers: [
    {provide: NG_VALIDATORS,
      useExisting: UniqueUsernameValidator,
      multi: true}]
})
export class UniqueUsernameValidator{
  validator: AsyncValidatorFn;

  constructor(private http: HttpClient ){
    this.validator = this.usernameValidator();
  }

  validate(username: AbstractControl){
    console.log("in the Username validator validate method");
    return this.validator(username);

  }

  searchUser(text:string):Observable<User>{
    console.log("in the search user??????????????");
    //debounce
    return timer(1000).pipe(
      switchMap(() => {
        //check if usrename is available by http call
        let url = "https://localhost:8443/users/byUsername/"+text;
        return this.http.get<User>(url);
      })
    );
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key:string]: any} | null> =>
    {
      return this.searchUser(control.value).pipe(
        map(res => {
          //if username is taken, ie a result is found

            //return error
            return { 'userNameExists': true}

        })
      );
    };
  }





  //todo: do i need this one fromthe official v8 docs??
  // validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   return this.usernameService.isUsernameTaken(ctrl.value).pipe(
  //     map(isTaken => (isTaken ? {uniqueUsername: true} : null)),
  //     catchError(() => null)
  //   );
  // }
  //
  // validate(control: AbstractControl): ValidationErrors | null {
  //   return undefined;
  // }


}
//
// @Directive({
//   selector: '[appCheckUsername]',
//   providers: [
//     {provide: NG_VALIDATORS,
//       useExisting: forwardRef(()=> UniqueUsernameValidator),
//       multi: true}]
// })
// export class UniqueUsernameValidatorDirective {
//   constructor(private validator: UniqueUsernameValidator){}
//
//   validate(control: AbstractControl){
//     this.validator.usernameValidator();
//   }
// }

