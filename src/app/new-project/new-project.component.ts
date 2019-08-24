import {Component, OnInit} from '@angular/core';
import {Project} from "../projects/model/project";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  selectedImageFile: File = null;

  model: newProjectVM = {
    title: '',
    description: '',
    type: '',
    creator: {
      "username": "",
      "location": "",
      "email": ""
    }
  };


  constructor(private http: HttpClient) {

  }


  ngOnInit() {
  }

  //todo return the id of the new project
  onSubmit(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': 'application/json',

        "Authorization": "Basic " + btoa("bob:bob123")
      })
    };
    //alert(this.model.type);
    let url = "http://localhost:8082/projects";
    this.http.post<Project>(url, this.model, httpOptions).subscribe(
      res => {
//todo image can probs be uploaded together with the rest, once i've figured it out
        this.uploadImageFile(res.projectID);
        //location.reload();
      },
      err => {
        alert("an error has occurred while adding project")
      }
    );
  }

  //https://www.youtube.com/watch?v=YkvqLNcJz3Y
  //todo fix the url once the backend is built


  onImageSelect(event): void {
    console.log(event);
    this.selectedImageFile = event.target.files[0];
  }


  //went from 404, 405, 415, 400, eventually worked!
  uploadImageFile(projectId:number): void{
    alert("image method to upload: " + this.selectedImageFile.name +", to ProjectId "+ projectId);

    const fd = new FormData();
    fd.append("file", this.selectedImageFile, this.selectedImageFile.name);

    this.http.post<Project>('http://localhost:8082/projects/'+projectId+"/addImage", fd).subscribe(
      res =>{
        alert('boom, image,' + res);
      },
      err =>{
        alert('an error occurred with image upload');
      }
    )

  }


}

export interface newProjectVM {
  title: string;
  description: string;
  type: string;
  creator: any;
}
