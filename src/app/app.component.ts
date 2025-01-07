import { Component } from '@angular/core';
import { LoginService } from './Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public loginService: LoginService, private router: Router) 
    {
    }
  title = 'Jobs Portal';
  logout(){
    this.loginService.Logout();
    this.router.navigate(['/login']);
  }
 
}
