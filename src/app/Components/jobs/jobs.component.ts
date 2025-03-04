import { Component } from '@angular/core';
import { JobService } from '../../Services/job.service';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-jobs',
  imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {
  jobs: any[] = [];
  searchTerm: string = '';
  pageNumber: number = 1;

  constructor(private jobService: JobService, private notificationSrevice: NotificationService) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.GetAllJobs().subscribe(data => {
      debugger;
      this.jobs = data.body; // Adjust based on the actual API response structure
    });
  }

  SendWhatsupMessage(job: any) {
    var currentUser = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage["currentUser"]) : null;
    if (currentUser != null) {
      this.notificationSrevice.SendNotification(currentUser.userId
        , job.id, "whatsup").subscribe({
        next: (response) => {
          alert("Notification Sent Successfully");
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => { }

      });
    }

  }

  SendSms(job: any) {
    alert("Sorry Not Implemented Yet! On The Way");
  }

  SendEmail(job: any) {
    debugger;
    var currentUser = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage["currentUser"]) : null;
    if (currentUser != null) {
      this.notificationSrevice.SendNotification(currentUser.userId
        , job.id, "mail").subscribe({
        next: (response) => {
          alert("Notification Sent Successfully");
        },
        error: (error) => {
          console.log(error);

        },
        complete: () => { }

      });
    }
  }
  // searchJobs() {
  //   if (this.searchTerm) {
  //     this.jobService.searchJobs(this.searchTerm).subscribe(data => {
  //       this.jobs = data;
  //     });
  //   } else {
  //     this.loadJobs();
  //   }
  // }

  editJob(id: number) {
    // Logic to navigate to the edit job component or open an edit form
  }

  deleteJob(id: number) {
    // this.jobService.deleteJob(id).subscribe(() => {
    //   this.loadJobs(); // Refresh the list after deleting a job
    // });
  }
}
