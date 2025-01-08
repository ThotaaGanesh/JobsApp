import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../Services/job.service';

@Component({
  selector: 'app-new-posting',
  imports: [],
  templateUrl: './new-posting.component.html',
  styleUrl: './new-posting.component.scss'
})
export class NewPostingComponent {
  constructor(private router: Router, private jobService: JobService) {
  }

  onSubmit(newJobForm: any) {
debugger;
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
