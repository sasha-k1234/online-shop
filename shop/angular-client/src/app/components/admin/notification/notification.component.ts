import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbModal,
  NgbModalModule,
  NgbNavModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NotificationModel } from '../../../models/notification.model';
import { NotificationTypeModel } from '../../../models/notificationType.model';
import { ToastrService } from 'ngx-toastr';
import { NotificationTypeModalComponent } from './modal/notification-type-modal/notification-type-modal.component';
import { AdminService } from '../../../services/admin.service';
import { UserModel } from '../../../models/user.model';
import { PaginationList } from '../../../models/pagination-list.model';
import { map } from 'rxjs';
import { NotificationCardComponent } from "../../notification-card/notification-card.component";
import { CreateNotificationComponent } from "./create-notification/create-notification.component";
import { ViewNotificationsComponent } from "./view-notifications/view-notifications.component";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule, NgbPaginationModule, NotificationCardComponent, NgbNavModule, CreateNotificationComponent, ViewNotificationsComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  active = 1;
  constructor(){

  }
  ngOnInit(): void {
    
  }
}
