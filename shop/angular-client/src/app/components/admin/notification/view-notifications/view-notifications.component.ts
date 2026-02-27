import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationModel } from '../../../../models/notification.model';
import { PaginationList } from '../../../../models/pagination-list.model';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../services/admin.service';
import { PaginationQuery } from '../../../../models/queries/paginationQuery.model';
import { TimeagoModule } from 'ngx-timeago';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-notifications',
  standalone: true,
  imports: [CommonModule, TimeagoModule, NgbTooltipModule,NgbPaginationModule],
  templateUrl: './view-notifications.component.html',
  styleUrl: './view-notifications.component.css',
})
export class ViewNotificationsComponent implements OnInit {
  query: PaginationQuery = new PaginationQuery();
  notifications: PaginationList<NotificationModel> = {
    list: [],
    totalCount: 0,
  } as PaginationList<NotificationModel>;
  ngOnInit(): void {
    this.getAllNotifications();
  }
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  getAllNotifications() {
    this.adminService.getNotifications(this.query).subscribe((res) => {
      this.notifications = res;
    });
  }

  makeAvailable(id: number) {
    this.adminService.makeAvailable(id).subscribe((res) => {
      this.toastr.success('Changed!');
      this.notifications.list.find((n) => n.id === id)!.is_available = true;
    });
  }

  changePage(pageNumber:number){
    this.query.page = pageNumber;
    this.getAllNotifications();
  }
}
