import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../Services/job.service';

@Component({
  selector: 'app-allprofiles',
  imports: [],
  templateUrl: './allprofiles.component.html',
  styleUrl: './allprofiles.component.scss'
})
export class AllprofilesComponent {
  allProfiles: any[] = [];
  currentuser: any;
  searchtext: string;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.currentuser = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage["currentUser"]) : null;
    if (this.currentuser != null) {
      this.getallprofiles('');
    }

  }

  // Triggered when the search input is updated live (optional)
  onSearchChange1(): void {
    debugger;
    if (this.searchtext.length >= 3 || this.searchtext.length == 0) {
      this.getallprofiles(this.searchtext); // Fetch updated profiles
    }
  }

  // Triggered when clicking the search button (explicit search action)
  onSearchClick1(): void {
    debugger;
    this.getallprofiles(this.searchtext); // Fetch updated profiles
  }

  getallprofiles(searchtext: any) {
    this.jobService.getAllProfiles(this.currentuser.userId, searchtext).subscribe((response: any) => {
      debugger;
      this.allProfiles = response.body;
    },
      (error: any) => {
        console.error('Error fetching profiles:', error); // Log error
      });
  }

}
