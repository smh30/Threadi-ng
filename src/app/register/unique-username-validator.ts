import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UsernameService} from "./username-service";

/**
 * A custom validator used to check whether a user's desired username already exists in the database. This is
 * implemented as an AsyncValidator because it involves making an HTTP call, so shouldn't be attempted until
 * other validators on the field pass to save unnecessary calls.
 *
 * @param usernameService - the UsernameService class is injected so it is available
 * @constructor
 */
export function UniqueUsernameValidator(usernameService: UsernameService): AsyncValidatorFn{


  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    //use the usernameService's method to make the http call to check the username. This method will return an
    //Observable - pipe this into a map function to handle the result.
    return usernameService.getUserByUsername(control.value).pipe(map(
      res => {
        //if the username returned matches the one entered in
        // the form, ie the name exists, return the UsernameTaken error
         return res.username === control.value  ? {"UsernameTaken": true} : null;

      }
    ))
  }

}


