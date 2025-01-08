import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './interceptors/jwt-un-authorized-interceptor.service';
import { LoginComponent } from './Components/login/login.component';
import { AboutComponent } from './Components/about/about.component';
import { JobPostingsComponent } from './Components/job-postings/job-postings.component';
import { JobsComponent } from './Components/jobs/jobs.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AlertDirective } from './directives/alert.directive';
import { FormsModule } from '@angular/forms';
import { NewPostingComponent } from './Components/new-posting/new-posting.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    JobPostingsComponent,
    JobsComponent,
    SignupComponent,
    AlertDirective,
    NewPostingComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot( {
      config: {
        tokenGetter: () => {
          return (sessionStorage.getItem("currentUser")? JSON.parse(sessionStorage["currentUser"]).token : null)
        }
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnAuthorizedInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
