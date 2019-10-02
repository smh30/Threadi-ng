import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {

  //https://codinglatte.com/posts/angular/cool-password-validation-angular/

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl){
    //console.log("in the match validator");
    const password1: string = control.get('password1').value;
    const password2: string = control.get('password2').value;

    if(password1 !== password2){
      control.get('password2').setErrors({NoPasswordMatch: true});
    }
  }


}
