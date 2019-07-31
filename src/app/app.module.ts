import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProjectsComponent } from './projects/projects.component';
import {Router, RouterModule, Routes} from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule} from "@angular/common/http";
import { NewProjectComponent } from './new-project/new-project.component';

const appRoutes : Routes = [
  //this is the route to each of the components
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'list-project',
    component: NewProjectComponent
  },
  //this one is the default
  {
    path: '',
    component: ProjectsComponent,
    pathMatch: 'full'
  },
  //and this is for page not found
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProjectsComponent,
    NotFoundComponent,
    NewProjectComponent
  ],
  imports: [
    BrowserModule,
    NgbCollapseModule,
    //this one is so that the routes are actually connected
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
