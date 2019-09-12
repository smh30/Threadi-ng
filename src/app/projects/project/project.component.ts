import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../model/project";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;

  loggedInUser: string;


  @Output() projectDeleted: EventEmitter<Project> = new EventEmitter<Project>();


  constructor(private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.loggedInUser = localStorage.getItem("username");
    //console.log("in project, list length=" + this.projects.length)
  }

  viewProject(){

     this.router.navigateByUrl("/project/"+this.project.projectID, );
    //  console.log("navigating to project id: "+ this.project.projectID);
    // this.router.navigate(["/project"], {state: {data: {project:this.project}}})
  }

  // deleteProject(){
  //   console.log("in projecct, deleting: "+ this.project.projectID);
  //   this.projectDeleted.emit(this.project);
  //   console.log("emitted")
  // }

}
