import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartModel } from '../../../../models/cart.model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/order.service';
import { CreateOrder } from '../../../../models/create-order.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  products: CartModel[] = [];
  createOrderModel: CreateOrder = {} as CreateOrder;
  totalPrice: number = 0;
  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly orderService: OrderService
  ) {}
  ngOnInit(): void {
    for (let i = 0; i < this.products.length; i++) {
      this.totalPrice +=
        this.products[i].product.price * this.products[i].quantity;
    }
  }

  createOrder() {
    this.orderService
      .createOrder(this.createOrderModel)
      .subscribe((res) => {
        this.activeModal.close(res);
      });
  }
}
