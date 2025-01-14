import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../Services/job.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-posting',
  imports: [],
  templateUrl: './new-posting.component.html',
  styleUrl: './new-posting.component.scss'
})
export class NewPostingComponent {  
  constructor(private router: Router, private jobService: JobService,private datePipe: DatePipe) {
    
  }
  

  onSubmit(newJobForm: any) {
debugger;
   let newpostingobj=newJobForm.value;
   newpostingobj.userId=1;
   newpostingobj.CompanyName=JSON.parse(sessionStorage["currentUser"]).organisationName;
    this.jobService.CreateNewJob(newJobForm.value).subscribe({
      next: (response) => {
        debugger;
        if (response.body.id != null) {
          this.router.navigate(["/posting"]);
        }
      },
      error: (error) => {
        console.log(error);

      },
      complete: () => { }

    });
  }
}
