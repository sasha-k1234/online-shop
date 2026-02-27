import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryCreateComponent } from './modals/category-create/category-create.component';
import { AddProductComponent } from "./add-product/add-product.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyticsComponent } from "./analytics/analytics.component";
import { NotificationComponent } from "./notification/notification.component";
import { CreateNotificationComponent } from "./notification/create-notification/create-notification.component";
import { OrderComponent } from "../cart/modals/order/order.component";
import { OrderManagmentComponent } from "./order-managment/order-managment.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbNavModule, AddProductComponent, ProductListComponent, AnalyticsComponent, NotificationComponent, CreateNotificationComponent, OrderComponent, OrderManagmentComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  active = 'addProduct';
  private readonly key = 'adminPage';
  constructor(private readonly router:Router,private readonly activatedRoute:ActivatedRoute){
    activatedRoute.queryParams.subscribe((param) => {
      const tab = param['tab'];
      if (tab) {
        this.active = tab;
      }
    });
  }
  
  pageChange(nextTab:string){
    this.router.navigate(['admin'], {
      queryParams: {
        tab: nextTab,
      },
    });
  }
}
