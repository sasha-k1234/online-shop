import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModel } from '../../../../models/order.model';
import { CommonModule } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { ProductService } from '../../../../services/product.service';
import { ProductModel } from '../../../../models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, TimeagoModule,RouterLink],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent implements OnInit {
  openOrderIndex = -1;
  totalCount: number = 0;
  page: number = 1;
  list: OrderModel[] = [];
  favorites:ProductModel[] = [];

  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getOrders(1);
    this.getFavorites();
  }

  getOrders(page: number) {
    this.page = page;
    this.orderService.getOrders(10, this.page).subscribe((res) => {
      this.totalCount = res.totalCount;
      this.list = res.list;
    });
  }

  getFavorites() {
    this.productService.getFavorites().subscribe((res)=>this.favorites = res);
  }

  deleteFavorite(id:number,e:Event){
    e.stopPropagation();
    e.preventDefault();
    this.productService.undoFavorite(id).subscribe(()=>this.favorites =  this.favorites.filter(p=>p.id!==id))
  }
}
