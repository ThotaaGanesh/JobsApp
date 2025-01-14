export class SubscribeViewModel {
    name: string;
    phoneNumber: string;
    qualification: string;
    alertType: string;
    isActive: boolean;

    constructor() {
        this.name = '';
        this.phoneNumber = '';
        this.qualification = '';  // Default or initial value could be set here if needed
        this.alertType = '';
        this.isActive = false;
    }
}
