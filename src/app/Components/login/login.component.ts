import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewModel } from '../../Models/login-view-model';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = "";

  constructor(public loginService: LoginService, private router: Router) 
  {    
  }
  
  ngOnInit()
  {
  }

  onLoginClick()
  {
    debugger;
    this.loginService.Login(this.loginViewModel).subscribe({
      next: (response) =>
      {
        if (this.loginService.currentUserRole == "Employer")
        {
          this.router.navigate(["/posting"]);
        }
        else
        {
          this.router.navigate(["/job"]);
        }
      },
     error: (error) =>
      {
        console.log(error);
        this.loginError = "Invalid Username or Password";
      },
      complete: () => {
        console.log('Completed');
      }
  });
  }
}
