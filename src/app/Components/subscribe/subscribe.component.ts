import { AfterViewInit, Component } from '@angular/core';
import { SubscribeService } from '../../Services/subscribe.service';
import $ from 'jquery';



@Component({
  selector: 'app-subscribe',
  imports: [], // Add NG-Select to your imports],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {
  constructor(private subscibeService: SubscribeService) { }
  selectedNotification: string | null;
  placeholderText: string | null;

  onChange(value: string): void {
    debugger;
    this.selectedNotification = value;
    this.placeholderText = this.selectedNotification == "email" ? "Email" : "Phone Number";
  }
  onSubmit(form: any) {
    let newalertForm = form.value;
    newalertForm.isActive = newalertForm.isActive == "" ? false : newalertForm.isActive;
    this.subscibeService.CreateNewSubscription(newalertForm).subscribe({
      next: (response) => {
        if (response.body.id != null) {
          alert("Added to subscription list");
        }
      },
      error: (error) => {
        console.log(error);

      },
      complete: () => { }

    });
  }
}

