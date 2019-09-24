import {Component, OnInit} from '@angular/core';
import {Project} from "../projects/model/project";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../shared/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  selectedImageFile: File = null;
  public imagePath;
  imgURL: any;
  public message: string;
  imagePassedIn: File;
  editMode: boolean = false;

  model = {
    title: '',
    description: '',
    type: '',
    projectCreatorId: localStorage.getItem("userId")
  };


  preview(files) {
    if (files.length === 0) {
      return;
    }
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported"
      return;
    }

    this.selectedImageFile = files[0];
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(this.selectedImageFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {

  }


  ngOnInit() {
    //if there's a project sent in (i.e. being accessed to edit
    //then set the model with that project's info
    //todo why is this check still causing console errors about being undefined?
    if (history.state.data.project !== undefined) {
      console.log("a project was passed in");
      this.editMode = true;
      this.model = history.state.data.project;
      this.imagePassedIn = history.state.data.project.projectImage;
      //this.model.title = history.state.data.project.title;

    }
  }

  //todo return the id of the new project
  onSubmit(): void {
    console.log("posting new project form");
    console.log("newCreatorID" + this.model.projectCreatorId);

    let url = "https://localhost:8443/projects/";
    this.http.post<Project>(url, this.model).subscribe(
      res => {


        if (this.selectedImageFile != null) {
          console.log("image to uploadddd");
          this.uploadImageFile(res.projectID);
        }


        this.router.navigateByUrl('/project/' + res.projectID);
      },
      err => {
        alert("an error has occurred while adding project")
      }
    );
  }

  editProject(): void {
    console.log("editing new project form");
    //alert(this.model.type);
    let url = "https://localhost:8443/projects/";
    this.http.put<Project>(url, this.model).subscribe(
      res => {

//todo image can probs be uploaded together with the rest, once i've figured it out
        if (this.selectedImageFile != null) {
          console.log("image to uploadddd");
          this.uploadImageFile(res.projectID);
        }

        //todo redirect to show the newly uploaded project
        //location.reload();
        this.router.navigateByUrl('/project/' + res.projectID);
      },
      err => {
        alert("an error has occurred while adding project")
      }
    );
  }




  //went from 404, 405, 415, 400, eventually worked!
  uploadImageFile(projectId: number): void {
    //alert("image method to upload: " + this.selectedImageFile.name +", to ProjectId "+ projectId);

    const fd = new FormData();
    fd.append("file", this.selectedImageFile, this.selectedImageFile.name);

    this.http.post<Project>('https://localhost:8443/projects/' + projectId + "/addImage", fd).subscribe(
      res => {
        return;
        //alert('boom, image,' + res);
      },
      err => {
        alert('an error occurred with image upload');
      }
    )

  }


}


