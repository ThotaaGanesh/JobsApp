import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {


  constructor(private httpClient: HttpClient) { }
  public CreateNewSubscription(alertForm: any): Observable<any> {
    return this.httpClient.post<any>("https://localhost:7288/api/Subscribe", alertForm, { responseType: "json", observe: "response" });
  }
}
