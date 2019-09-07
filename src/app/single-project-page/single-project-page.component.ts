import { Component, OnInit } from '@angular/core';
import {Project} from "../projects/model/project";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-single-project-page',
  templateUrl: './single-project-page.component.html',
  styleUrls: ['./single-project-page.component.css']
})
export class SingleProjectPageComponent implements OnInit {
  project: Project;
  projectID: string;
  projects: Project[];

  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
    this.route.params.subscribe(params =>
      this.projectID = params.id);
      //console.log(params));
    console.log("projectID to show = "+this.projectID)

  }

  ngOnInit() {
this.getAllProjects();

    // this.project = history.state.data.project;
    // console.log("in single project page, id="+ this.project.projectID);

  }

  getSingleProject(id: string){
    // do an http call to get the project info
    //nope actually get it from the list which still exists in the component next dorr
  }

  public getAllProjects() {
    let url = "https://localhost:8443/projects/";


    //alert(httpOptions.headers.get("Authorization").toString());
    this.http.get<Project[]>(url).subscribe(
      res => {
        this.projects = res;
        this.projects.forEach(p => {
          console.log("this project name: " + p.title);
          console.log("this project desc: " + p.description);
          console.log("creator:" + p.creator.username);
          //console.log('logged in user: ' + this.loggedInUser);

        })
      },
      err => {
        alert("an error occured while getting project listings")
      }
    );
//edit edit
  }

}
