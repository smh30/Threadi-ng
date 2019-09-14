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
import {UsernameService} from "./username-service";

// @Injectable({providedIn: 'root'})
export function UniqueUsernameValidator(usernameService: UsernameService): AsyncValidatorFn{
  //console.log("in the validator");
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return usernameService.getUserByUsername(control.value).pipe(map(
      res => {
        //if something returned ie the name exists, return the UsernameTaken error
         return res  ? {"UsernameTaken": true} : null;
        // return {"UsernameTaken": true};
      }
    ))
  }






  // validate(ctrl: AbstractControl):
  //   Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   return this.usernameService.isUsernameTaken(ctrl.value).pipe(
  //     map(isTaken => (isTaken ? {uniqueUsername: true} : null)),
  //     catchError(() => null)
  //   );
  // }

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

