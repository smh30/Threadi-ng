import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../projects/model/project";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-project-list-sidebar',
  templateUrl: './project-list-sidebar.component.html',
  styleUrls: ['./project-list-sidebar.component.css']
})
export class ProjectListSidebarComponent implements OnInit {
  @Input() projects: Project[] = [];

  constructor() { }

  ngOnInit() {

  }


}
