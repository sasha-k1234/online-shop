import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NotificationModel } from '../../models/notification.model';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [CommonModule,TimeagoModule],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css'
})
export class NotificationCardComponent {
  hover:boolean = false;
  @Input() notification:NotificationModel = {} as NotificationModel;
}
