import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationViewModel } from '../Models/notification-view-model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 private notificationModel: NotificationViewModel;
  constructor(private httpClient: HttpClient) { }

  public SendNotification(userid: number, jobid: number,type:string): Observable<any> {

    this.notificationModel = new NotificationViewModel(userid, jobid, type);
    return this.CreateNewNotification(this.notificationModel);
  }


  private CreateNewNotification(notificationViewModel: NotificationViewModel): Observable<any> {

    return this.httpClient.post<any>("https://localhost:7288/api/SendNotifications", notificationViewModel, { responseType: "json", observe: "response" });

  }
}
