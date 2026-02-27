import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { CartService } from '../../services/cart.service';
import { Photo } from '../../models/photo.model';
import {
  NgbDropdownModule,
  NgbPopoverModule,
  NgbScrollSpyModule,
  NgbScrollSpyService,
} from '@ng-bootstrap/ng-bootstrap';
import { PaginationList } from '../../models/pagination-list.model';
import { NotificationModel } from '../../models/notification.model';
import { NotificationService } from '../../services/notification.service';
import { NotificationCardComponent } from '../notification-card/notification-card.component';
import {
  InfiniteScrollDirective,
  InfiniteScrollModule,
} from 'ngx-infinite-scroll';
import { HasRoleDirective } from '../../directives/has-role.directive';

@Component({
  selector: 'app-navbar',

  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgbDropdownModule,
    NgbPopoverModule,
    NotificationCardComponent,
    InfiniteScrollModule,
    HasRoleDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isLogged: boolean = true;
  mainPhoto: Photo | null = null;
  username: string = '';

  notifications = {
    list: [],
    totalCount: 0,
  } as PaginationList<NotificationModel>;
  notificationPageNum: number = 1;
  constructor(
    public accountService: AccountService,
    public cartService: CartService,
    public notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user) => {
      if (user) {
        this.cartService.getCart().subscribe();
        this.getUser(user.username);
      }
    });
    this.getUserNotifications();
  }

  logout() {
    this.accountService.logout();
  }

  getUser(username: string) {
    this.accountService.getUserData(username).subscribe((user) => {
      this.mainPhoto = user.main_photo;
      this.username = user.username;
      console.log(username);
      
    });
  }

  getUserNotifications() {
    this.notificationService
      .getNotifications(this.notificationPageNum, 3)
      .subscribe((res) => (this.notifications = res));
  }

  onScrollDown() {
    this.notificationService
      .getNotifications(++this.notificationPageNum, 3)
      .subscribe((res) => {
        let unreaded = this.notifications.list.filter(
          (n) => !n.read_at && n.isMy
        );

        for (let i = 0; i < unreaded.length; i++) {
          this.notificationService
            .makeReaded(unreaded[i].id)
            .subscribe((res) => {
              unreaded[i]!.read_at = new Date(Date.now());
            });
        }
        this.notifications.list = [...this.notifications.list, ...res.list];
        this.notifications.totalCount += res.totalCount;
      });
  }

  onScrollUp() {}
}
