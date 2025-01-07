import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { CanActivateGuardService } from './guards/can-activate-guard.service';
import { AboutComponent } from './Components/about/about.component';
import { SignupComponent } from './Components/signup/signup.component';
import { JobPostingsComponent } from './Components/job-postings/job-postings.component';
import { JobsComponent } from './Components/jobs/jobs.component';

const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component:LoginComponent, pathMatch: "full" },
    { path: "about", component: AboutComponent, data: { linkIndex: 2 } },
    { path: "signup", component: SignupComponent, data: { linkIndex: 1 } },
    { path: "posting", component: JobPostingsComponent,canActivate:[CanActivateGuardService], data: { linkIndex: 3 } },
    { path: "job", component: JobsComponent, canActivate:[CanActivateGuardService],data: { linkIndex: 4 } }  
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule
  {
  }