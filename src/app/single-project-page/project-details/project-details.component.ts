import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../projects/model/project";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectToShow: string;
  @Input() projects: Project[] = [];

  project:Project;

  constructor() { }

  ngOnInit() {
    //console.log("In individual project page, projectid = "+this.project.projectID);
    this.project = this.projects.find(i => i.projectID.toString()===this.projectToShow);
  }

}
