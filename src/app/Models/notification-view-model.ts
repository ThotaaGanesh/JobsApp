export class NotificationViewModel {
    id: number
    userId: number;
    jobId: number;
    type: string;
    isNotificationSent: boolean;

    constructor(userid:number,jobid:number,type:string) {
        this.id = 0;
        this.userId = userid;
        this.jobId = jobid;  // Default or initial value could be set here if needed
        this.type = type;
        this.isNotificationSent = false;
    }
}
