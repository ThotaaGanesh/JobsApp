import { Component } from '@angular/core';
import { JobService } from '../../Services/job.service';

@Component({
  selector: 'app-job-postings',
  imports: [],
  templateUrl: './job-postings.component.html',
  styleUrl: './job-postings.component.scss'
})
export class JobPostingsComponent {
  jobs: any[] = [];
  searchTerm: string = '';
  pageNumber: number = 1;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.GetJobsByOrganisation(this.GetOrgnaisationId()).subscribe(data => {
      debugger;
      this.jobs = data.body; // Adjust based on the actual API response structure
    });
  }
  private GetOrgnaisationId(): number {
    return JSON.parse(sessionStorage["currentUser"]).userId;
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
