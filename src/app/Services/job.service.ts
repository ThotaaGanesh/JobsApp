import { HttpBackend, HttpClient } from '@angular/common/http';
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

  public GetAllJobs(): Observable<any> {

    return this.httpClient.get<any>("https://localhost:7288/api/Jobs", { responseType: "json", observe: "response" });

  }

}
