import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, FormArray} from "@angular/forms";
import { Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(""),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postcode: new FormControl('')
  //   })
  // });
  profileForm = this.fb.group({
    //You can define the control with just the initial value, but if your controls need sync or async validation, add sync and async validators as the second and third items in the array.
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: ['hams'],
      state: [''],
      postcode: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  onSubmit(){
    //TODO user Eventemitter with form value
    console.warn(this.profileForm.value)
  }

  updateProfile(){
    this.profileForm.patchValue({
      firstName: "Nancy",
      address: {
        street: '123 Brooks Lane'
      }
    });
  }

  get aliases(){
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias(){
    this.aliases.push(this.fb.control(''));
  }
}
