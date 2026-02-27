import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { AdminService } from '../../../services/admin.service';
import { OrderQuery } from '../../../models/queries/admin/orderQuery';
import { OrderModel } from '../../../models/order.model';
import { PaginationList } from '../../../models/pagination-list.model';
import { RouterLink } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-order-managment',
  standalone: true,
  imports: [
    NgbPaginationModule,
    CommonModule,
    TimeagoModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './order-managment.component.html',
  styleUrl: './order-managment.component.css',
})
export class OrderManagmentComponent implements OnInit {
  query: OrderQuery = new OrderQuery();
  openOrderIndex = -1;
  statuses: string[] = [];
  previousSelectValue: string = '';

  orders: PaginationList<OrderModel> = {
    list: [],
    totalCount: 0,
  } as PaginationList<OrderModel>;
  constructor(
    private adminService: AdminService,
    private orderService: OrderService,
    public modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.getOrders(1);
    this.getStatus();
  }

  getOrders(page: Number) {
    this.adminService
      .getOrders(this.query)
      .subscribe((res) => (this.orders = res));
  }

  getStatus() {
    this.orderService.getStatuses().subscribe((s) => (this.statuses = s));
  }

  changeOrderStatus(e: Event, id: number, status: string) {
    console.log(status, id, e);

    // this.statuses = [...this.statuses];

    this.modalService.open().subscribe({
      next: (res) => {
        this.adminService.changeOrderStatus(id, status).subscribe();
      },
      error: (res) => {
        let el = this.orders.list.find((el) => el.id === id);
        if (el) {
          el.status = this.previousSelectValue;
        }
      },
    });
  }

}
