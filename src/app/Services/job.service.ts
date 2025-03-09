import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {


  constructor(private httpClient: HttpClient) {
  }

  public CreateNewJob(jobViewModel: any): Observable<any> {

    return this.httpClient.post<any>("https://localhost:7288/api/Jobs", jobViewModel, { responseType: "json", observe: "response" });

  }

  public GetAllJobs(userid:number): Observable<any> {

    return this.httpClient.get<any>(`https://localhost:7288/api/jobs/user/${userid}`, { responseType: "json", observe: "response" });

  }

  public GetJobsByOrganisation(orgid: number): Observable<any> {

    return this.httpClient.get<any>("https://localhost:7288/api/jobs/organisation/" + orgid, { responseType: "json", observe: "response" });

  }

  public getMatchedProfiles(jobid: number, search: string, page: number, pageSize: number): Observable<any> {

    let params = new HttpParams()
    params = params.set('page', page); // Add the orgid parameter
    params = params.set('pageSize', pageSize); // Add the orgid parameter

    // Add search query if it's provided
    if (typeof search != 'undefined' && search) {
      params = params.set('search', search);
    }

    const url = `https://localhost:7288/api/jobs/${jobid}/matched-profiles`;

    // Pass the params object to the HttpClient
    return this.httpClient.get<any>(url, {
      responseType: 'json',
      observe: 'response',
      params: params // Attach the query parameters
    });

  }
}
