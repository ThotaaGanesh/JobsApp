import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { CanActivateGuardService } from './guards/can-activate-guard.service';
import { AboutComponent } from './Components/about/about.component';
import { SignupComponent } from './Components/signup/signup.component';
import { JobPostingsComponent } from './Components/job-postings/job-postings.component';
import { JobsComponent } from './Components/jobs/jobs.component';
import { NewPostingComponent } from './Components/new-posting/new-posting.component';
import { SubscribeComponent } from './Components/subscribe/subscribe.component';
import { AllprofilesComponent } from './Components/allprofiles/allprofiles.component';
import { AnnouncementsComponent } from './Components/announcements/announcements.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "dashboard", component: AboutComponent },
  { path: "signup", component: SignupComponent },
  { path: "posting", component: JobPostingsComponent, canActivate: [CanActivateGuardService] },
  { path: "newposting", component: NewPostingComponent, canActivate: [CanActivateGuardService] },
  { path: "job", component: JobsComponent, canActivate: [CanActivateGuardService] },
  { path: "subscribe", component: SubscribeComponent, canActivate: [CanActivateGuardService] },
  { path: "allprofiles", component: AllprofilesComponent, canActivate: [CanActivateGuardService] },
  { path: "announcements", component: AnnouncementsComponent, canActivate: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}