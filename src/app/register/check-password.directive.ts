// import { Directive } from '@angular/core';
// import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, ValidatorFn} from "@angular/forms";
// import {ValidateFn, Validator} from "codelyzer/walkerFactory/walkerFn";
// import {ComponentMetadata} from "codelyzer";
//
// function validatePassword(): ValidatorFn {
//   return (control: AbstractControl) => {
//     let isValid = false;
//     if (control && control instanceof FormGroup) {
//       let group = control as FormGroup;
//       if (group.controls['password'] && group.controls['pword2']) {
//         isValid = group.controls['password'].value == group.controls['pword2'].value;
//       }
//     }
//     if (isValid) {
//       return null;
//     } else {
//       return { 'passwordCheck': 'failed' }
//     }
//   }
// }
//
//
// //https://medium.com/@hohohouf/how-to-validate-passwords-in-an-angular-5-template-driven-form-e85264dd9a9b
//
//
// //todo deal with error
//
//   @Directive({
//     selector: '[appCheckPassword]',
//     providers: [{ provide: NG_VALIDATORS, useExisting: CheckPasswordDirective, multi: true }]
//   })
//
//   export class CheckPasswordDirective implements Validator {
//   private valFn;
//
//   constructor() {
//     this.valFn = validatePassword();
//   }
//
//   validate(c: AbstractControl): ValidationErrors | null {
//     return this.valFn(c);
//   }
//
//     kind: "Node" | "NgComponent";
//     validate: ValidateFn<ts.Node> | ValidateFn<ComponentMetadata>;
//
//
// }
