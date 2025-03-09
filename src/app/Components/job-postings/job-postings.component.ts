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
  searchProfile: string = '';
  totalMatchedProfiles: number = 5;
  pageNumber: number = 1;
  matchedProfiles: any[] = []; // Profiles for the currently selected job
  selectedJob: any = null; // The current selected job
  loading: boolean = false; // Controls the loading spinner
  pageCount: number = 5;

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
  // Handle opening of Matched Profiles Modal
  openMatchedProfiles(job: any) {
    this.selectedJob = job; // Set the selected job
    this.pageNumber = 1; // Reset pagination
    this.loading = true; // Show loading spinner

    this.fetchMatchedProfiles(); // Fetch matched profiles dynamically
  }

  // Fetch matched profiles dynamically from the server
  fetchMatchedProfiles() {
    this.jobService.getMatchedProfiles(this.selectedJob.id, this.searchProfile, this.pageNumber, this.pageCount).subscribe(
      (response: any) => {
        debugger;
        this.loading = false; // Hide loading spinner
        this.matchedProfiles = response.body.candidates; // Populate matched profiles for the job
        this.totalMatchedProfiles = response.body.totalCount;
      },
      (error: any) => {
        this.loading = false; // Hide spinner even if there's an error
        console.error('Error fetching profiles:', error); // Log error
      }
    );
  }

  // Pagination logic for matched profiles
  onPageChange(page: number) {
    this.pageNumber = page; // Update the page number
    this.fetchMatchedProfiles(); // Fetch the next page of matched profiles
  }

  // Triggered when the search input is updated live (optional)
  onSearchChange(): void {
    if (this.searchProfile.length == 3 || this.searchProfile.length == 0) {
      this.pageNumber = 1; // Reset to first page
      this.fetchMatchedProfiles(); // Fetch updated profiles
    }
  }

  // Triggered when clicking the search button (explicit search action)
  onSearchClick(): void {
    this.pageNumber = 1; // Reset to first page
    this.fetchMatchedProfiles(); // Fetch updated profiles
  }
}
