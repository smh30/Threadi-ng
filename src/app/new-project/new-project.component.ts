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

  //the image selected for upload, if any
  selectedImageFile: File = null;

  //used in the previewing of images before upload
  public imagePath;
  imgURL: any;

  //used to display the image if a project is being edited
  imagePassedIn: File;

  editMode: boolean = false;

  //the data model which the form fields are used to populate, which is then sent
  //to the backend when a project is created.
  model = {
    title: '',
    description: '',
    type: '',
    projectCreatorId: localStorage.getItem("userId")
  };


  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    //if there's a project sent in (i.e. being accessed to edit
    //then the model is set with that project's information so that it
    //appears in the template

    if (history.state.data !== undefined) {
      this.editMode = true;
      this.model = history.state.data.project;
      //the image is set separately as it is displayed differently from the other
      //field (i.e. in the preview space rather than in form fields)
      this.imagePassedIn = history.state.data.project.projectImage;
    }
  }

  //Called when the form is submitted with a new project - sends the new project to the backend
  async onSubmit() {

    //checks if a too large image is added - if so, alerts rather than attempting upload
    //to avoid backend errors
    if (this.selectedImageFile != null && this.selectedImageFile.size > 1000 * 1000) {
      alert("Image size too large, please select a smaller image and try again");
    } else {

      //send the model data as a post request to the API
      let url = "https://localhost:8443/projects/";
      this.http.post<Project>(url, this.model).subscribe(
        res => {
          //when the response arrives, if there is an image to upload, do so and then
          //redirect to the page showing the new project
          if (this.selectedImageFile != null) {

            //the Id of the newly created project is passed through so the image is added to the
            //same project
            this.uploadImageFile(res.projectID, () => {
              this.router.navigateByUrl('/project/' + res.projectID);
            });


          } else {
            //if no image, redirect to the page showing the newly uploaded project

            this.router.navigateByUrl('/project/' + res.projectID);
          }
        },
        err => {
          alert("an error has occurred while adding project")
        }
      );
    }
  }

  //called when the form is submitted with an edited project. Similar to the previous method
  editProject(): void {

    //checks if a too large image is added - if so, alerts rather than attempting upload
    //to avoid backend errors
    if (this.selectedImageFile != null && this.selectedImageFile.size > 1000 * 1000) {
      alert("Image size too large, please select a smaller image and try again");
    } else {
      //sends the model data as a put request to the API
      let url = "https://localhost:8443/projects/";
      this.http.put<Project>(url, this.model).subscribe(
        res => {

          //if there's an image to upload, do so and then redirect
          if (this.selectedImageFile != null) {
            this.uploadImageFile(res.projectID, () => {
              this.router.navigateByUrl('/project/' + res.projectID);
            });
          } else {
            //simply redirect to show the updated project
            this.router.navigateByUrl('/project/' + res.projectID);
          }
        },
        err => {
          alert("an error has occurred while adding project")
        }
      );
    }
  }

  //upload the selected image file (add it to the projectId which is passed in)
  uploadImageFile(projectId: number, callback) {

    // a new FormData object is created as this is the format expected by the API, and the file is appended to it
    const fd = new FormData();
    fd.append("file", this.selectedImageFile, this.selectedImageFile.name);

    //send a post request to the API with the formdata containing the image
    this.http.post<Project>('https://localhost:8443/projects/' + projectId + "/addImage", fd).subscribe(
      value => {
        //if successful, redirect to the individual project page
        callback();
      },
      err => {
        alert('an error occurred with image upload');
      });


  }

  //this method creates the preview which is shown when an image is selected
  preview(files) {
    //if no file is selected, nothing to do
    if (files.length === 0) {
      return;
    }
    let mimeType = files[0].type;
    //if the file type is not an image, show an alert
    if (mimeType.match(/image\/*/) == null) {
      alert("Only image file formats are supported");
      return;
    }

    //get the file from the theoretical array of files provided by the file upload control
    this.selectedImageFile = files[0];

    this.imagePath = files;

    //read the file as data
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedImageFile);
    //set the imgURL to the data read from the file, which will then be displayed on the page.
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


}


