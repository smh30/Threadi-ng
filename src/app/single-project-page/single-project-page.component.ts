import { Component, OnInit } from '@angular/core';
import {Project} from "../projects/model/project";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-single-project-page',
  templateUrl: './single-project-page.component.html',
  styleUrls: ['./single-project-page.component.css']
})
export class SingleProjectPageComponent implements OnInit {
  project: Project;
  projectID: string;
  loggedInUser: string;

  //https://medium.com/better-programming/angular-6-url-parameters-860db789db85

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {

  }

  ngOnInit() {
    this.projectID = this.route.snapshot.paramMap.get("id");
    console.log("project id in single comp: "+ this.projectID);

    this.getSingleProject(this.projectID, ()=>{
      this.loggedInUser = localStorage.getItem("username");
    });


  }

  getSingleProject(id: string, callback){
    let url = "https://localhost:8443/projects/"+ id;


    this.http.get<Project>(url).subscribe(
      res=>{
        console.log("got project");
        this.project = res;
        callback();
      },
      err => {
        console.log("yup surely an error with getting the project")
      }
    )

  }

return(){
    this.router.navigateByUrl("/")
}



   deleteProject(project: Project){
    console.log("in project view component");
    console.log("deleting:" +project.projectID);
    if(confirm("are you sure you want to delete this project?")){
      let url = "https://localhost:8443/projects/" + project.projectID + "/";
      this.http.delete<Project[]>(url).subscribe(
        res => {
          // let indexOfProject = this.projects.indexOf(project);
          // this.projects.splice(indexOfProject, 1);
          this.router.navigateByUrl("/")
        },
        err => {
          alert("an error occurred while deleting the project")
        }
      )


    }
  }

  editProject(project:Project){
    alert("gonna edit the project "+ project.projectID);
    //pass the project info to the creat project page
    this.router.navigate(["/list-project"], {state: {data: {project: this.project}}});



  }

}
