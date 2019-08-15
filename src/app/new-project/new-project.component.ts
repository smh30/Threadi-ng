import {Component, OnInit} from '@angular/core';
import {Project} from "../projects/model/project";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  model: newProjectVM = {
    title: '',
    description: '',
    type: '',
    creator: {
      "name": "",
      "location": "",
      "email": ""
    }
  };

  constructor(private http: HttpClient) {

  }


  ngOnInit() {
  }

  onSubmit(): void {
    alert(this.model.type);
    let url = "http://localhost:8082/listings/create";
    this.http.post(url, this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert("an error has occurred while adding project")
      }
    );
  }


}

export interface newProjectVM {
  title: string;
  description: string;
  type: string;
  creator: any;
}
