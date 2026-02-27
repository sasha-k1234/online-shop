import { Component, OnInit } from '@angular/core';
import { NotificationCardComponent } from '../../../notification-card/notification-card.component';
import { NgbModal, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { NotificationModel } from '../../../../models/notification.model';
import { PaginationList } from '../../../../models/pagination-list.model';
import { UserModel } from '../../../../models/user.model';
import { AdminService } from '../../../../services/admin.service';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationTypeModalComponent } from '../modal/notification-type-modal/notification-type-modal.component';
import { UserQuery } from '../../../../models/queries/admin/userQuery.model';

@Component({
  selector: 'app-create-notification',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule, NgbPaginationModule, NotificationCardComponent],
  templateUrl: './create-notification.component.html',
  styleUrl: './create-notification.component.css'
})
export class CreateNotificationComponent implements OnInit{
  types: string = '';
  users: PaginationList<UserModel> = {} as PaginationList<UserModel>;
  selectedUsers: UserModel[] = [];
  selectedUsersString: string = '';
  query:UserQuery = new UserQuery();
  

  constructor(
    private notificationService: NotificationService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private adminService: AdminService
  ) {}
  notificationModel: NotificationModel = {} as NotificationModel;
  ngOnInit(): void {
    this.getUsers();
    this.notificationModel.created_at = new Date(Date.now());
  }

  createNotification() {
    this.notificationModel.directs = this.selectedUsers.map(u=>u.id);
    this.notificationService
      .createNotification(this.notificationModel)
      .subscribe((res) => this.toastr.success('Created'));
  }

  openModal() {
    const modal = this.modal.open(NotificationTypeModalComponent);
    modal.componentInstance.checkedArr = this.notificationModel.types;
    modal.result.then((res) => {
      this.notificationModel.types = res;
      this.types = this.notificationModel.types
        .map((type) => type.name)
        .join(',');
    });
  }

  getUsers() {
    this.adminService
      .getUsers(this.query)
      .pipe(
        map((res) => {
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].selected = this.selectedUsers
              .map((x) => x.id)
              .includes(res.list[i].id);
          }
          return res;
        })
      )
      .subscribe((res) => (this.users = res));
  }

  pageChange(page: any) {
    this.query.page = page;
    this.getUsers();
  }

  selectUser(user: UserModel) {
    if (user.selected) {
      user.selected = false;
     this.selectedUsers = this.selectedUsers.filter(u=>u.selected);
     this.selectedUsersString = this.selectedUsers.map((u) => u.email).join(',');
     this.users.list = [...this.users.list];
      return;
    }
    this.selectedUsers.push(user);
    this.selectedUsersString = this.selectedUsers.map((u) => u.email).join(',');
    user.selected = true;
  }
}
