import {Component, OnInit} from '@angular/core';
import {Project} from "../projects/model/project";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

/**
 * Controller for the display single project page
 */
@Component({
  selector: 'app-single-project-page',
  templateUrl: './single-project-page.component.html',
  styleUrls: ['./single-project-page.component.css']
})
export class SingleProjectPageComponent implements OnInit {

  //A Project object which is to be displayed on the page
  project: Project;

  //Stores the id of the project to be displayed (which is passed in via url)
  projectID: string;

  //The username of the logged in user
  loggedInUser: string;



  /**
   * Constructor injection of the 3 required items
   * @param route: used to get the project Id from the URL /route
   * @param http: used to make http call to get project information
   * @param router: to redirect to other pages when doing delete, edit, or return to main page
   */
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {

  }

  /**
   * When this component is initialised, get the 'id' parameter from the URL. This parameter is
   * identified in the Routes defined in the app.component.ts class as 'project/:id'.
   * (Thanks to https://medium.com/better-programming/angular-6-url-parameters-860db789db85)
   *
   * Use the recovered ID to fetch the data for that project
   */
  ngOnInit() {
    //Get the id parameter from the URL route
    this.projectID = this.route.snapshot.paramMap.get("id");

    //Pass the ID to the getSingleProject method, and when this method returns fetch the logged
    //in username from localStorage and set it in this controller.
    this.getSingleProject(this.projectID, () => {
      this.loggedInUser = localStorage.getItem("username");
    });


  }

  /**
   * Makes a http call to get the details for the specified project, then performs the
   * callback function which was passed in
   *
   * @param id
   * @param callback
   */
  getSingleProject(id: string, callback) {

    //The url to which this method will call
    let url = "https://localhost:8443/projects/" + id;

    //Make a GET request to the above URL
    this.http.get<Project>(url).subscribe(
      res => {
        //If successful, set the result into the project variable of this component
        this.project = res;
        callback();
      },
      err => {
        alert("Sorry, an error occurred when fetching the project information. Please" +
          "try again.")
      }
    )

  }

  /**
   * Called when the "return to projects list" button is selected. Redirects to the home page
   */
  return() {
    this.router.navigateByUrl("/")
  }

  /**
   * Called when the "Delete" button is selected. Checks that the user is sure they want to
   * delete the project, then makes an HTTP delete request to delete it.
   * @param project: the project to be deleted
   */
  deleteProject(project: Project) {

    //Confirm that the user is sure
    if (confirm("Are you sure you want to delete this project?")) {

      //defines the URL for deleting the project
      let url = "https://localhost:8443/projects/" + project.projectID + "/";

      //Make the http DELETE request
      this.http.delete<Project[]>(url).subscribe(
        res => {
          //if successful, return to the main page
          this.router.navigateByUrl("/")
        },
        err => {
          //if failed, alert the user
          alert("An error occurred while deleting the project")
        }
      )
    }
  }

  /**
   * Called when the edit project button is selected. Sets the current project's data into the
   * Router's state object, then redirects to the "list project" page (the page used to create
   * new projects).  Because the state contains a project, the "list project" page will
   * be configured to edit mode.
   *
   * @param project: the project to be edited
   */
  editProject(project: Project) {

    //pass the project info to the "list project" page and navigate there
    this.router.navigate(["/list-project"], {state: {data: {project: this.project}}});


  }

}
