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
searchText: string = "";




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
  }



  public getAllProjects(){
    let url = "https://localhost:8443/projects";
    //alert(btoa("bob:bob123"));
    const httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': 'application/json',

        "Authorization": "Basic " + btoa("bob:bob123")
      })
    };

    //alert(httpOptions.headers.get("Authorization").toString());
    this.http.get<Project[]>(url, httpOptions).subscribe(
      res => {
        this.projects = res;
        this.projects.forEach(p => {
          console.log("this project name: "+ p.title);
          console.log("this project desc: " +p.description);
          console.log("creator:"+ p.creator.username)
        })
      },
      err => {
        alert("an error occured while getting project listings")
      }
    );

  }

  public deleteProject(project: Project){
    const httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': 'application/json',

        "Authorization": "Basic " + btoa("bob:bob123")
      })
    };
    let url = "https://localhost:8443/projects/"+ project.projectID;
    this.http.delete<Project[]>(url, httpOptions).subscribe(
      res => {
          this.projects = res;
      },
      err => {
        alert("an error occurred while deleting the project")
      }
    )

  }

  public filterProjects(searchText:string){
    alert("filteringby: "+ searchText);
    this.searchText = searchText;
  }

}
