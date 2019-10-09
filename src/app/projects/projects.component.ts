import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "./model/project";

/**
 * This is the controller for the projects page
 */
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  //the array of projects to be displayed
  projects: Project[] = [];

  //parameters entered into the search form, set as variables here so they will be
  //available in the HTML template
  searchType: string = "";
  searchText: string = "";


  constructor(private http: HttpClient) {
  }

  //automatically runs when the page loads. Calls a method to fetch all the projects.
  ngOnInit() {
    this.getAllProjects();
  }


  //makes a http request to fetch the list of projects from the backend and sets them into
  //the project array variable
  public getAllProjects() {
    let url = "https://localhost:8443/projects/";

    this.http.get<Project[]>(url).subscribe(
      res => {
        this.projects = res;

      },
      err => {
        alert("an error occurred while getting project listings")
      }
    );

  }

  //sets the search parameters which were emitted by the search component into the parameter
  //variables of this controller
  public setSearchParams(searchParams: object) {

    if (searchParams != {}) {

      this.searchType = searchParams['searchType'];
      this.searchText = searchParams['searchText'];

    }
  }

}
