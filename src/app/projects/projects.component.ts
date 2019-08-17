import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  }

  ngOnInit() {
    this.getAllProjects();
  }

  public getAllProjects(){
    let url = "http://localhost:8082/listings/all";
    this.http.get<Project[]>(url).subscribe(
      res => {
        this.projects = res;
        // this.projects.forEach(p => {
        //   console.log("this project name: "+ p.title);
        //   console.log("this project image: " +p.projectImage);
        // })
      },
      err => {
        alert("an error occured while getting project listings")
      }
    );

  }

  public deleteProject(project: Project){

    let url = "http://localhost:8082/listings/delete/"+ project.projectID;
    this.http.delete<Project[]>(url).subscribe(
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
