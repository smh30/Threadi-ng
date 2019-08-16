import {Component, OnInit} from '@angular/core';
import {Project} from "../projects/model/project";
import {HttpClient} from "@angular/common/http";

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
      "name": "",
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
    //alert(this.model.type);
    let url = "http://localhost:8082/listings/create";
    this.http.post(url, this.model).subscribe(
      res => {
        this.uploadImageFile();
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

  uploadImageFile(): void{
    alert("image method to upload: " + this.selectedImageFile.name);
    //const fd = new FormData();
    //fd.append("image", this.selectedImageFile, this.selectedImageFile.name);
    this.http.post('http://localhost:8082', this.selectedImageFile).subscribe(
      res =>{
        alert('boom, image');
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
