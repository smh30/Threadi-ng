import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../model/project";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

/**
 * Controller for the individual project card component
 */
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  /*
  When each instance of this component is created it receives a project as input
   */
  @Input() project: Project;


  /*
  Constructor includes dependency on the Router (so that the component can redirect
  to another page)
   */
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  viewProject() {
    this.router.navigateByUrl("/project/" + this.project.projectID,);

  }


}
