import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProjectsComponent } from './projects/projects.component';
import {Router, RouterModule, Routes} from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NewProjectComponent } from './new-project/new-project.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor} from "./shared/auth-interceptor";
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { FilterProjectsPipe } from './shared/filter-projects.pipe';
import { ProjectComponent } from './projects/project/project.component';
import { SingleProjectPageComponent } from './single-project-page/single-project-page.component';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


//todo split out routes to its own class/file
const appRoutes : Routes = [
  //this is the route to each of the components
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {animation: "ProjectsComponent"}
  },
  {
    path: 'list-project',
    component: NewProjectComponent,
  },
  {
    path: 'project-card',
    component: ProjectComponent,
    data: {animation: "ProjectCard"}
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {animation: "RegisterComponent"}
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'project/:id',
    component: SingleProjectPageComponent
  },
  //this one is the default
  {
    path: '',
    component: ProjectsComponent,
    pathMatch: 'full'
  },



  {
    path: 'login',
    component: LoginComponent
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
    NewProjectComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    FilterProjectsPipe,
    ProjectComponent,
    SingleProjectPageComponent,

  ],
  imports: [
    BrowserModule,
    NgbCollapseModule,
    //this one is so that the routes are actually connected
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
