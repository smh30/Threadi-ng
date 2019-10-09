import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


/**
 * Contains custom form field validators which are used in the Register component.
 */
export class CustomValidators {

  /**Thanks to: https://codinglatte.com/posts/angular/cool-password-validation-angular/
   * Used in the Register component
   * to validate that the entered password contains all the required character types by comparing
   * the value of the control (the entered password) with a provided regex. If the pattern is not matched,
   * return an error which was passed to this method.
   *
   */
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

  /**
   * Used in the Register component to check whether the two entries of the password match each other. Both
   * passwords are passed in as an AbstractControl and compared to each other - if they do not match an error
   * is set on the "password2" field.
  */
  static passwordMatchValidator(control: AbstractControl) {

    const password1: string = control.get('password1').value;
    const password2: string = control.get('password2').value;

    if (password1 !== password2) {
      control.get('password2').setErrors({NoPasswordMatch: true});
    }
  }


}
