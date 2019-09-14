import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent implements OnInit {

  //means that the default value is empty string
  name = new FormControl('');

  constructor() {
  }

  ngOnInit() {
  }

  updateNmae(){
    this.name.setValue("Nancy")
  }

}
