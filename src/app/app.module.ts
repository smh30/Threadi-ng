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

import { FormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { FilterProjectsPipe } from './shared/filter-projects.pipe';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {AuthGuardService} from "./shared/auth-guard.service";

const appRoutes : Routes = [
  //this is the route to each of the components
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'list-project',
    component: NewProjectComponent,
    canActivate:[AuthGuardService]
  },
  //this one is the default
  {
    path: '',
    component: ProjectsComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate:[AuthGuardService]
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
    ProfileComponent,
    SearchComponent,
    FilterProjectsPipe,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    NgbCollapseModule,
    //this one is so that the routes are actually connected
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
