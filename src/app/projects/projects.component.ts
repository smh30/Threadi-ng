import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "./model/project";


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {


  projects: Project[] = [];
  // searchParams: object = {
  //   searchText: "",
  //   searchType: ""
  // };
searchType: string = "";
searchText: string ="";
searchLocation: string ="";
  loggedInUser: string;


  constructor(private http: HttpClient) {
    //https://stackoverflow.com/questions/50694913/angular-6-httpclient-passing-basic-auth-in-httpoptions/50696466
    //todo figure out if the above link was actually helpful??
    // var headers_object = new HttpHeaders();
    // headers_object.append('Content-Type', 'application/json');
    // headers_object.append("Authorization", "Basic " + btoa("username:password"))
    // this.httpOptions = {
    //   headers: headers_object
    //}
  }

  ngOnInit() {
    this.getAllProjects();
    this.loggedInUser = localStorage.getItem("username");
  }


  public getAllProjects() {
    let url = "https://localhost:8443/projects/";


    //alert(httpOptions.headers.get("Authorization").toString());
    this.http.get<Project[]>(url).subscribe(
      res => {
        this.projects = res;
        this.projects.forEach(p => {
          console.log("this project name: " + p.title);


        })
      },
      err => {
        alert("an error occured while getting project listings")
      }
    );
//edit edit
  }

public deleteProject(project: Project){
    console.log("in parent component");
    console.log("deleting:" +project.projectID);
    if(confirm("are you sure you want to delete this project?")){
      let url = "https://localhost:8443/projects/" + project.projectID + "/";
      this.http.delete<Project[]>(url).subscribe(
        res => {
          let indexOfProject = this.projects.indexOf(project);
          this.projects.splice(indexOfProject, 1);
        },
        err => {
          alert("an error occurred while deleting the project")
        }
      )


    }
}



  public filterProjects(searchParams: object) {
console.log("filtering projects");
    if (searchParams != {}) {
      console.log("search params aren't empty");
      //let {searchType, searchText, searchLocation} = searchParams;
      let searchType = searchParams[0];
      let searchText = searchParams[1];
      let searchLocation = searchParams[2];
      //alert("filteringby: " + searchText);

      console.log("in projects.ts text = " + searchText, "type = " + searchType);
      this.searchText = searchText;
      this.searchType = searchType;
      this.searchLocation = searchLocation;
    }
  }

}
