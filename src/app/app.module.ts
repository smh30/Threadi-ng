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
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { FilterProjectsByTextPipe } from './shared/filter-projects-byText.pipe';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor} from "./shared/auth-interceptor";
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { FilterProjectsByTypePipe } from './shared/filter-projects-by-type.pipe';


const appRoutes : Routes = [
  //this is the route to each of the components
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'list-project',
    component: NewProjectComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
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
    ProfileComponent,
    SearchComponent,
    FilterProjectsByTextPipe,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    FilterProjectsByTypePipe,
  ],
  imports: [
    BrowserModule,
    NgbCollapseModule,
    //this one is so that the routes are actually connected
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
