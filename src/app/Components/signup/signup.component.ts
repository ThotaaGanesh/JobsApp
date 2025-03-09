import { Component } from '@angular/core';
import { SignUpViewModel } from '../../Models/sign-up-view-model';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  selectedNotification: string | null;
  placeholderText: string | null;
   constructor(public loginService: LoginService, private router: Router) 
    {    
    }
  //public signUpViewModel : SignUpViewModel =new  SignUpViewModel();
  selectedRole: string | undefined;

  onRoleChange(role: string): void {
    this.selectedRole = role;
  }
  onNotificationTypeChange(value: string): void {
    debugger;
    this.selectedNotification = value;
    this.placeholderText = this.selectedNotification == "email" ? "Email" : "Phone Number";
  }
  onSubmit(form: any) {
    debugger;
    const signupobj=form.value;
    signupobj.RoleId=signupobj.role=='Employer'?2:3;
    signupobj.role=null;
    console.log('Submitted!', signupobj);
    this.loginService.Register(signupobj).subscribe({
next:(response)=>{
  debugger;
  if(response.body.id!=null){
    this.router.navigate(["/login"]);
  }
},
error: (error)=>{
console.log(error);

},
complete: ()=>{}

    });
  }
}
