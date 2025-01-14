import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginViewModel } from '../Models/login-view-model';
import { map, Observable } from 'rxjs';
import { SignUpViewModel } from '../Models/sign-up-view-model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient: HttpClient | undefined;

  constructor(private httpBackend: HttpBackend, private jwtHelperService: JwtHelperService) {
  }

  currentUserName: any = null;
  currentUserRole: any = null;
  organisationName: any = null;

  public Login(loginViewModel: LoginViewModel): Observable<any> {
    debugger;
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>("https://localhost:7288/api/Auth/login", loginViewModel, { responseType: "json", observe: "response" })
      .pipe(map(response => {
        if (response) {
          debugger;
          this.currentUserName = response.body.data.username;
          this.currentUserRole = response.body.data.role;
          this.organisationName = this.currentUserRole == "Employer" ? response.body.data.organisationName : null;
          sessionStorage['currentUser'] = JSON.stringify(response.body.data);
        }
        return response.body.data;
      }));
  }

  public detectIfAlreadyLoggedIn() {
    if (this.jwtHelperService.isTokenExpired() == false) {
      var currentUser = JSON.parse(sessionStorage['currentUser']);
      this.currentUserName = currentUser.userName;
      this.currentUserRole = currentUser.userRole;
      this.organisationName = currentUser.userRole == "Employer" ? currentUser.organisationName : null;
    }
  }

  public Register(signUpViewModel: any): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>("https://localhost:7288/api/Users", signUpViewModel, { responseType: "json", observe: "response" });

  }

  getUserByEmail(Email: string): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>("https://localhost:7288/api/getUserByEmail/" + Email, { responseType: "json" });
  }

  public Logout() {
    sessionStorage.removeItem("currentUser");
    this.currentUserName = null;
  }

  public isAuthenticated(): boolean {
    var token: any = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage["currentUser"]).token : null;
    if (this.jwtHelperService.isTokenExpired()) {
      return false; //token is not valid
    }
    else {
      return true; //token is valid
    }
  }

  public getAllEmployes(): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>("https://localhost:7288/api/getallemployees", { responseType: "json" });
  }
}
